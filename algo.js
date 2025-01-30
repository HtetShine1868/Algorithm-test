
let courses = [
{
    title: "Item 1",
    description: "description",
    price: 169.98,
    category: "Development",
    rating: 4.6,
    students: 87158,
    isNew: true
},
{
    title: "Item 2",
    description: "Decription",
    price: 89.98,
    category: "Security",
    rating: 4.7,
    students: 4532,
    isNew: false
}
];

let isSorted = false; // Track if the list is sorted
let currentSortKey = null; // Track the current sort key

// Display courses
function renderCourses() {
const grid = document.getElementById('courseGrid');
grid.innerHTML = '';

courses.forEach((course, index) => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.id = `course-${index}`;
    card.innerHTML = `
        ${course.isNew ? '<div style="color: #48bb78; margin-bottom: 10px;">NEW</div>' : ''}
        <h3>${course.title}</h3>
        <div class="course-meta">
            <div>${course.description}</div>
            <div style="margin-top: 10px;">
                ⭐ ${course.rating}/5 (${course.students.toLocaleString()})
            </div>
        </div>
        <div class="course-price">$${course.price.toFixed(2)}</div>
    `;
    grid.appendChild(card);
});
}

// Add new course
document.getElementById('addCourse').addEventListener('click', () => {
const title = document.getElementById('courseTitle').value.trim();
const price = parseFloat(document.getElementById('coursePrice').value);

if (title && price) {
    courses.push({
        title,
        description: "New course description",
        price,
        category: "Development",
        rating: 4.5,
        students: 0,
        isNew: true
    });
    isSorted = false; // Adding new items makes the list unsorted
    currentSortKey = null; // Reset the sort key
    renderCourses();
    document.getElementById('courseTitle').value = '';
    document.getElementById('coursePrice').value = '';
}
});

// Sorting functionality
document.getElementById('sortButton').addEventListener('click', () => {
const sortBy = document.getElementById('sortBy').value;
const algorithm = document.getElementById('sortAlgorithm').value;
const start = performance.now();

switch(algorithm) {
    case 'bubbleSort':
        bubbleSort(courses, sortBy);
        break;
    case 'insertionSort':
        insertionSort(courses, sortBy);
        break;
    case 'quickSort':
        quickSort(courses, 0, courses.length - 1, sortBy);
        break;
}

const duration = performance.now() - start;
document.getElementById('sortingPerformance').textContent = 
    `Sorting time: ${duration.toFixed(2)}ms`;

isSorted = true; // Mark the list as sorted
currentSortKey = sortBy; // Update the current sort key
renderCourses();
});

// Search functionality
document.getElementById('searchButton').addEventListener('click', () => {
const searchTerm = document.getElementById('searchInput').value.trim();
const searchBy = document.getElementById('searchBy').value;
const algorithm = document.getElementById('searchAlgorithm').value;
const start = performance.now();

// Hide any previous warnings
document.getElementById('searchWarning').style.display = 'none';

let results = [];
if (algorithm === 'linear') {
    results = linearSearch(courses, searchTerm, searchBy);
} else if (algorithm === 'binary') {
    if (!isSorted || currentSortKey !== searchBy) {
        document.getElementById('searchWarning').textContent =
            "Binary search requires a sorted list. Please sort the list first.";
        document.getElementById('searchWarning').style.display = 'block';
        return;
    }
    results = binarySearch(courses, searchTerm, searchBy);
} else if (algorithm === 'fuzzy') {
    results = fuzzySearch(courses, searchTerm, searchBy);
}

const duration = performance.now() - start;
document.getElementById('searchPerformance').textContent = 
    `Search time: ${duration.toFixed(2)}ms`;

if (results.length > 0) {
    highlightFoundItems(results);
} else {
    alert('Item not found');
}
});

// Highlight found items
function highlightFoundItems(indices) {
const allCards = document.querySelectorAll('.course-card');
allCards.forEach(card => card.classList.remove('highlight'));

indices.forEach(index => {
    const foundCard = document.getElementById(`course-${index}`);
    if (foundCard) {
        foundCard.classList.add('highlight');
        foundCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});
}

// Sorting Algorithms
function bubbleSort(array, key) {
const len = array.length;
for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
        if (key === 'title' ? array[j][key].localeCompare(array[j + 1][key]) > 0 : array[j][key] > array[j + 1][key]) {
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
        }
    }
}
}

function insertionSort(array, key) {
for (let i = 1; i < array.length; i++) {
    let current = array[i];
    let j = i - 1;
    while (j >= 0 && (key === 'title' ? array[j][key].localeCompare(current[key]) > 0 : array[j][key] > current[key])) {
        array[j + 1] = array[j];
        j--;
    }
    array[j + 1] = current;
}
}

function quickSort(array, left, right, key) {
if (left < right) {
    const pivotIndex = partition(array, left, right, key);
    quickSort(array, left, pivotIndex - 1, key);
    quickSort(array, pivotIndex + 1, right, key);
}
}

function partition(array, left, right, key) {
const pivot = array[right][key];
let i = left - 1;

for (let j = left; j < right; j++) {
    if (key === 'title' ? array[j][key].localeCompare(pivot) <= 0 : array[j][key] <= pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
    }
}

[array[i + 1], array[right]] = [array[right], array[i + 1]];
return i + 1;
}

// Search Algorithms
function linearSearch(array, term, key) {
return array.reduce((acc, item, index) => {
    if (key === 'title' ? item.title.toLowerCase().includes(term.toLowerCase()) : item.price.toString().includes(term)) {
        acc.push(index);
    }
    return acc;
}, []);
}

function binarySearch(array, term, key) {
let left = 0;
let right = array.length - 1;
let results = [];

while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midVal = key === 'title' ? array[mid].title.toLowerCase() : array[mid].price;

    if (key === 'title' ? midVal === term.toLowerCase() : midVal == term) {
        results.push(mid);
        // Check for duplicates on the left and right
        let leftIndex = mid - 1;
        while (leftIndex >= 0 && (key === 'title' ? array[leftIndex].title.toLowerCase() === term.toLowerCase() : array[leftIndex].price == term)) {
            results.push(leftIndex);
            leftIndex--;
        }
        let rightIndex = mid + 1;
        while (rightIndex < array.length && (key === 'title' ? array[rightIndex].title.toLowerCase() === term.toLowerCase() : array[rightIndex].price == term)) {
            results.push(rightIndex);
            rightIndex++;
        }
        break;
    }
    if (key === 'title' ? midVal < term.toLowerCase() : midVal < term) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}
return results;
}

function fuzzySearch(array, term, key) {
return array.reduce((acc, item, index) => {
    if (key === 'title' ? item.title.toLowerCase().includes(term.toLowerCase()) : item.price.toString().includes(term)) {
        acc.push(index);
    }
    return acc;
}, []);
}

// Initial render
renderCourses();
