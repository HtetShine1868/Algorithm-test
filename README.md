# Course Management System

A web-based application for managing and searching courses. This system allows users to add, sort, and search courses using various algorithms. It includes features like adding new courses, sorting by name or price, and searching using linear, binary, or fuzzy search algorithms.

---

## Features

1. **Add New Courses**:
   - Add a new course with a title and price.
   - Automatically updates the course list.

2. **Sort Courses**:
   - Sort courses by **Name** or **Price**.
   - Choose from three sorting algorithms:
     - **Bubble Sort**
     - **Insertion Sort**
     - **Quick Sort**
   - Displays sorting performance time.

3. **Search Courses**:
   - Search courses by **Name** or **Price**.
   - Choose from three search algorithms:
     - **Linear Search**
     - **Binary Search** (requires sorted list)
     - **Fuzzy Search**
   - Displays search performance time.
   - Highlights found items in the course grid.

4. **Performance Tracking**:
   - Tracks and displays the time taken for sorting and searching operations.

5. **User Feedback**:
   - Warns the user if binary search is attempted on an unsorted list.

---

## How to Use

1. **Add a New Course**:
   - Enter the course title and price in the left sidebar.
   - Click the **Add Item** button.

2. **Sort Courses**:
   - Select the sorting criteria (**Name** or **Price**).
   - Choose a sorting algorithm (**Bubble Sort**, **Insertion Sort**, or **Quick Sort**).
   - Click the **Sort** button.

3. **Search Courses**:
   - Enter a search term in the search bar.
   - Select the search criteria (**Name** or **Price**).
   - Choose a search algorithm (**Linear Search**, **Binary Search**, or **Fuzzy Search**).
   - Click the **Search** button.

4. **View Results**:
   - Search results are highlighted in the course grid.
   - Performance times for sorting and searching are displayed.

---

## Algorithms Used

### Sorting Algorithms:
1. **Bubble Sort**:
   - A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.

2. **Insertion Sort**:
   - Builds the final sorted array one item at a time by inserting each element into its correct position.

3. **Quick Sort**:
   - A divide-and-conquer algorithm that selects a pivot element and partitions the array into two halves, then recursively sorts each half.

### Search Algorithms:
1. **Linear Search**:
   - Searches for an item by checking each element in the list sequentially.

2. **Binary Search**:
   - Searches for an item in a sorted list by repeatedly dividing the search interval in half.

3. **Fuzzy Search**:
   - Searches for items that approximately match the search term (case-insensitive).

---

## Requirements

- A modern web browser (e.g., Chrome, Firefox, Edge).
- No additional dependencies or installations required.

---

## How to Run

1. Download the `index.html` file.
2. Open the file in a web browser.
3. Start adding, sorting, and searching courses!

---

## Notes

- **Binary Search** requires the list to be sorted. If the list is not sorted, a warning will be displayed.
- Adding a new course resets the sorted state of the list.
- Performance times are displayed in milliseconds.

---

## Example Usage

1. Add a few courses with titles and prices.
2. Sort the courses by **Price** using **Quick Sort**.
3. Search for a course by **Name** using **Binary Search**.
4. Observe the highlighted results and performance times.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

## Author
[https://github.com/HtetShine1868]
