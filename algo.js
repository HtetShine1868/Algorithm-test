   let courses = [
            {
                title: "Web Development Basics",
                description: "Learn fundamental web technologies",
                price: 169.98,
                category: "Development",
                rating: 4.6,
                students: 87158,
                isNew: true
            },
            {
                title: "Cybersecurity Fundamentals",
                description: "Essential security concepts",
                price: 89.98,
                category: "Security",
                rating: 4.7,
                students: 4532,
                isNew: false
            }
        ];

        let isSorted = false;
        let currentSortKey = null;
        let filteredCourses = courses;

        // Display courses
        function renderCourses(coursesToRender = filteredCourses) {
            const grid = document.getElementById('courseGrid');
            grid.innerHTML = '';
            coursesToRender.forEach((course, index) => {
                const card = document.createElement('div');
                card.className = 'course-card';
                card.id = `course-${index}`;
                card.innerHTML = `
                    ${course.isNew ? '<div style="color: #28a745;">NEW</div>' : ''}
                    <h3>${course.title}</h3>
                    <div>${course.description}</div>
                    <div>⭐ ${course.rating}/5 (${course.students.toLocaleString()})</div>
                    <div class="course-price">$${course.price.toFixed(2)}</div>
                `;
                grid.appendChild(card);
            });
        }

        // Enhanced Price Filter
        document.getElementById('filterPriceButton').addEventListener('click', () => {
            let min = parseFloat(document.getElementById('minPrice').value);
            let max = parseFloat(document.getElementById('maxPrice').value);

            if (isNaN(min) && isNaN(max)) {
                filteredCourses = courses;
                renderCourses();
                return;
            }

            if (isNaN(min)) min = 0;
            if (isNaN(max)) max = Infinity;

            filteredCourses = courses.filter(course => course.price >= min && course.price <= max);
            renderCourses();
        });

        // Intelligent Algorithm Selection
            function chooseBestSortingAlgorithm(itemCount) {
        if (itemCount <= 5) {
            return { algorithm: 'bubbleSort', reason: `Bubble Sort (for ≤5 items)` };
        }
        if (itemCount <= 15) {
            return { algorithm: 'insertionSort', reason: `Insertion Sort (for ≤15 items)` };
        }
        return { algorithm: 'quickSort', reason: `Quick Sort (for >15 items)` };
    }

        function chooseBestSearchAlgorithm(itemCount, isSorted, key) {
            if (isSorted && key === currentSortKey) {
                return {
                    algorithm: 'binary',
                    reason: `Binary Search (O(log n)) - Best for sorted ${key}`
                };
            }
            if (itemCount > 1000) {
                return {
                    algorithm: 'fuzzy',
                    reason: `Fuzzy Search (O(n)) - Best for large unsorted datasets (${itemCount} items)`
                };
            }
            return {
                algorithm: 'linear',
                reason: `Linear Search (O(n)) - Best for moderate datasets (${itemCount} items)`
            };
        }

        // Sorting Algorithms
        const sortingAlgorithms = {
            bubbleSort: (arr, key) => {
                const n = arr.length;
                for (let i = 0; i < n - 1; i++) {
                    for (let j = 0; j < n - i - 1; j++) {
                        if (key === 'title' ? arr[j][key].localeCompare(arr[j + 1][key]) > 0 : arr[j][key] > arr[j + 1][key]) {
                            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                        }
                    }
                }
            },
            insertionSort: (arr, key) => {
                for (let i = 1; i < arr.length; i++) {
                    let current = arr[i];
                    let j = i - 1;
                    while (j >= 0 && (key === 'title' ? arr[j][key].localeCompare(current[key]) > 0 : arr[j][key] > current[key])) {
                        arr[j + 1] = arr[j];
                        j--;
                    }
                    arr[j + 1] = current;
                }
            },
            quickSort: (arr, left, right, key) => {
                if (left < right) {
                    const pivotIndex = partition(arr, left, right, key);
                    sortingAlgorithms.quickSort(arr, left, pivotIndex - 1, key);
                    sortingAlgorithms.quickSort(arr, pivotIndex + 1, right, key);
                }
            }
        };

        function partition(arr, left, right, key) {
            const pivot = arr[right][key];
            let i = left - 1;
            for (let j = left; j < right; j++) {
                if (key === 'title' ? arr[j][key].localeCompare(pivot) <= 0 : arr[j][key] <= pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            }
            [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
            return i + 1;
        }


// Search Algorithms
const searchAlgorithms = {
    linear: (arr, term, key) => arr.reduce((acc, item, i) => {
        if (key === 'title' ? item.title.toLowerCase().includes(term.toLowerCase()) : item.price == term) {
            acc.push(i);
        }
        return acc;
    }, []),
    binary: (arr, term, key) => {
        let results = [];
        let left = 0, right = arr.length - 1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const midVal = arr[mid][key];
            if (key === 'title' ? midVal.toLowerCase() === term.toLowerCase() : midVal == term) {
                results.push(mid);
                let i = mid - 1;
                while (i >= 0 && (key === 'title' ? arr[i][key].toLowerCase() === term.toLowerCase() : arr[i][key] == term)) {
                    results.push(i--);
                }
                i = mid + 1;
                while (i < arr.length && (key === 'title' ? arr[i][key].toLowerCase() === term.toLowerCase() : arr[i][key] == term)) {
                    results.push(i++);
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
    },
    fuzzy: (arr, term, key) => arr.reduce((acc, item, i) => {
        if (key === 'title' ? item.title.toLowerCase().includes(term.toLowerCase()) : Math.abs(item.price - term) <= 50) {
            acc.push(i);
        }
        return acc;
    }, [])
};

// Highlight Found Items
function highlightFoundItems(indices) {
    document.querySelectorAll('.course-card').forEach(card => card.classList.remove('highlight'));
    indices.forEach(i => document.getElementById(`course-${i}`)?.classList.add('highlight'));
}

        // Sorting Handler
        document.getElementById('sortButton').addEventListener('click', () => {
            const sortBy = document.getElementById('sortBy').value;
            const algorithm = document.getElementById('sortAlgorithm').value;

            const selected = algorithm === 'auto' ? chooseBestSortingAlgorithm(courses.length) : {
                algorithm,
                reason: `Manual selection: ${algorithm}`
            };

            const start = performance.now();
            sortingAlgorithms[selected.algorithm](courses, sortBy);
            const duration = performance.now() - start;

            document.getElementById('sortingPerformance').innerHTML = `
                Sorting time: ${duration.toFixed(2)}ms | 
                Algorithm: ${selected.reason}
            `;

            isSorted = true;
            currentSortKey = sortBy;
            renderCourses();
        });

 // Search Handler
document.getElementById('searchButton').addEventListener('click', () => {
    const term = document.getElementById('searchInput').value.trim();
    const searchBy = document.getElementById('searchBy').value;
    const algorithm = document.getElementById('searchAlgorithm').value;

    if (!term) return alert('Please enter a search term');

    const selected = algorithm === 'auto' ? chooseBestSearchAlgorithm(filteredCourses.length, isSorted, searchBy) : {
        algorithm,
        reason: `Manual selection: ${algorithm}`
    };

    if (selected.algorithm === 'binary' && (!isSorted || searchBy !== currentSortKey)) {
        document.getElementById('searchWarning').textContent = 'Binary search requires sorted data. Sort first or use another algorithm.';
        document.getElementById('searchWarning').style.display = 'block';
        return;
    }

    const start = performance.now();
    let results = searchAlgorithms[selected.algorithm](filteredCourses, term, searchBy);

    // If searching by price, include items within ±50 of the searched price
    if (searchBy === 'price') {
        const searchedPrice = parseFloat(term);
        if (!isNaN(searchedPrice)) {
            const lowerBound = searchedPrice - 50;
            const upperBound = searchedPrice + 50;

            results = filteredCourses.reduce((acc, item, i) => {
                if (item.price >= lowerBound && item.price <= upperBound) {
                    acc.push(i);
                }
                return acc;
            }, []);
        }
    }

    const duration = performance.now() - start;

    document.getElementById('searchPerformance').innerHTML = `
        Search time: ${duration.toFixed(2)}ms | 
        Algorithm: ${selected.reason}
    `;

    if (results.length === 0) {
        document.getElementById('searchWarning').textContent = 'No items found matching your search criteria.';
        document.getElementById('searchWarning').style.display = 'block';
    } else {
        document.getElementById('searchWarning').style.display = 'none';
    }

    highlightFoundItems(results);
});

        // Add Item Handler
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
                isSorted = false;
                currentSortKey = null;
                filteredCourses = courses;
                renderCourses();
                document.getElementById('courseTitle').value = '';
                document.getElementById('coursePrice').value = '';
            }
        });

        // Initial render
        renderCourses();
