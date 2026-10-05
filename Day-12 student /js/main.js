import {
    Student,
    defaultStudents
} from "./students.js";


import {
    saveStudents,
    loadStudents
} from "./storage.js";


import {
    fetchRandomUser
} from "./api.js";


import {
    escapeHTML,
    getGradeClass,
    calculateAverage,
    getNextId
} from "./utils.js";


/* =====================================
   STUDENTS
===================================== */

let students = [];


/* =====================================
   DOM
===================================== */

const studentForm =
    document.getElementById(
        "studentForm"
    );


const studentId =
    document.getElementById(
        "studentId"
    );


const studentName =
    document.getElementById(
        "studentName"
    );


const studentEmail =
    document.getElementById(
        "studentEmail"
    );


const studentCourse =
    document.getElementById(
        "studentCourse"
    );


const studentMarks =
    document.getElementById(
        "studentMarks"
    );


const submitButton =
    document.getElementById(
        "submitButton"
    );


const cancelEdit =
    document.getElementById(
        "cancelEdit"
    );


const studentTableBody =
    document.getElementById(
        "studentTableBody"
    );


const searchStudent =
    document.getElementById(
        "searchStudent"
    );


const courseFilter =
    document.getElementById(
        "courseFilter"
    );


const clearFilters =
    document.getElementById(
        "clearFilters"
    );


const emptyState =
    document.getElementById(
        "emptyState"
    );


const recordCount =
    document.getElementById(
        "recordCount"
    );


/* =====================================
   STATISTICS
===================================== */

const totalStudents =
    document.getElementById(
        "totalStudents"
    );


const averageMarks =
    document.getElementById(
        "averageMarks"
    );


const topStudents =
    document.getElementById(
        "topStudents"
    );


const totalCourses =
    document.getElementById(
        "totalCourses"
    );


/* =====================================
   API
===================================== */

const loadApiStudent =
    document.getElementById(
        "loadApiStudent"
    );


const apiLoading =
    document.getElementById(
        "apiLoading"
    );


const apiError =
    document.getElementById(
        "apiError"
    );


const profileContainer =
    document.getElementById(
        "profileContainer"
    );


const profileEmpty =
    document.getElementById(
        "profileEmpty"
    );


const profileImage =
    document.getElementById(
        "profileImage"
    );


const profileName =
    document.getElementById(
        "profileName"
    );


const profileEmail =
    document.getElementById(
        "profileEmail"
    );


const profileCountry =
    document.getElementById(
        "profileCountry"
    );


/* =====================================
   DATE
===================================== */

const currentDate =
    document.getElementById(
        "currentDate"
    );


currentDate.textContent =
    new Date().toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );


/* =====================================
   INITIALIZE
===================================== */

const initializeStudents = () => {

    const saved =
        loadStudents();


    if (
        saved.length > 0
    ) {

        students =
            saved.map(
                student => {

                    return new Student(

                        student.id,

                        student.name,

                        student.email,

                        student.course,

                        student.marks,

                        student.source,

                        student.image,

                        student.country

                    );

                }
            );

    }

    else {

        students =
            [...defaultStudents];


        saveStudents(
            students
        );

    }


    updateStatistics();

    displayStudents(
        students
    );

};


/* =====================================
   STATISTICS
===================================== */

const updateStatistics = () => {

    totalStudents.textContent =
        students.length;


    averageMarks.textContent =
        calculateAverage(
            students
        ).toFixed(1);


    topStudents.textContent =
        students.filter(
            student =>
                student.marks >= 90
        ).length;


    const courses =
        new Set(
            students.map(
                student =>
                    student.course
            )
        );


    totalCourses.textContent =
        courses.size;

};


/* =====================================
   DISPLAY
===================================== */

const displayStudents =
    list => {

        studentTableBody.innerHTML =
            "";


        recordCount.textContent =
            `${list.length} Students`;


        if (
            list.length === 0
        ) {

            emptyState.classList.remove(
                "hidden"
            );

            return;

        }


        emptyState.classList.add(
            "hidden"
        );


        list.forEach(
            student => {

                const row =
                    document.createElement(
                        "tr"
                    );


                const grade =
                    student.getGrade();


                const imageHTML =
                    student.image

                    ? `
                        <img
                            class="student-avatar"
                            src="${escapeHTML(
                                student.image
                            )}"
                            alt="${escapeHTML(
                                student.name
                            )}"
                        >
                    `

                    : `
                        <div class="student-avatar">
                            👤
                        </div>
                    `;


                const sourceHTML =
                    student.source === "API"

                    ? `
                        <span class="source-api">
                            🌐 API
                        </span>
                    `

                    : `
                        <span class="source-local">
                            💾 Local
                        </span>
                    `;


                row.innerHTML = `

                    <td>
                        #${student.id}
                    </td>


                    <td>

                        <div class="student-cell">

                            ${imageHTML}


                            <button
                                class="student-name-btn"
                                data-action="profile"
                                data-id="${student.id}"
                            >
                                ${escapeHTML(
                                    student.name
                                )}
                            </button>

                        </div>

                    </td>


                    <td>
                        ${escapeHTML(
                            student.email
                        )}
                    </td>


                    <td>
                        ${escapeHTML(
                            student.course
                        )}
                    </td>


                    <td>
                        <strong>
                            ${student.marks}
                        </strong>
                        /100
                    </td>


                    <td>

                        <span
                            class="grade ${getGradeClass(
                                grade
                            )}"
                        >
                            ${grade}
                        </span>

                    </td>


                    <td>
                        ${sourceHTML}
                    </td>


                    <td>

                        <button
                            class="action-btn edit-btn"
                            data-action="edit"
                            data-id="${student.id}"
                            title="Edit Student"
                        >
                            ✏️
                        </button>


                        <button
                            class="action-btn delete-btn"
                            data-action="delete"
                            data-id="${student.id}"
                            title="Delete Student"
                        >
                            🗑️
                        </button>

                    </td>

                `;


                studentTableBody.appendChild(
                    row
                );

            }
        );

    };


/* =====================================
   FILTER
===================================== */

const filterStudents = () => {

    const search =
        searchStudent.value
            .toLowerCase()
            .trim();


    const course =
        courseFilter.value;


    const filtered =
        students.filter(
            student => {

                const nameMatch =
                    student.name
                        .toLowerCase()
                        .includes(
                            search
                        );


                const courseMatch =
                    course ===
                        "All Courses"
                    ||
                    student.course ===
                        course;


                return (
                    nameMatch &&
                    courseMatch
                );

            }
        );


    displayStudents(
        filtered
    );

};


/* =====================================
   VALIDATION
===================================== */

const validateForm = () => {

    let valid = true;


    document.getElementById(
        "nameError"
    ).textContent = "";


    document.getElementById(
        "emailError"
    ).textContent = "";


    document.getElementById(
        "courseError"
    ).textContent = "";


    document.getElementById(
        "marksError"
    ).textContent = "";


    const name =
        studentName.value.trim();


    const email =
        studentEmail.value.trim();


    const course =
        studentCourse.value;


    const marks =
        Number(
            studentMarks.value
        );


    if (
        name.length < 2
    ) {

        document.getElementById(
            "nameError"
        ).textContent =
            "Enter a valid name.";

        valid = false;

    }


    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
        !emailRegex.test(
            email
        )
    ) {

        document.getElementById(
            "emailError"
        ).textContent =
            "Enter a valid email.";

        valid = false;

    }


    if (!course) {

        document.getElementById(
            "courseError"
        ).textContent =
            "Select a course.";

        valid = false;

    }


    if (
        Number.isNaN(marks) ||
        marks < 0 ||
        marks > 100
    ) {

        document.getElementById(
            "marksError"
        ).textContent =
            "Marks must be between 0 and 100.";

        valid = false;

    }


    return valid;

};


/* =====================================
   ADD / UPDATE
===================================== */

studentForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        if (
            !validateForm()
        ) {

            return;

        }


        const id =
            Number(
                studentId.value
            );


        const name =
            studentName.value.trim();


        const email =
            studentEmail.value.trim();


        const course =
            studentCourse.value;


        const marks =
            Number(
                studentMarks.value
            );


        if (id) {

            const index =
                students.findIndex(
                    student =>
                        student.id === id
                );


            if (
                index !== -1
            ) {

                students[index] =
                    new Student(

                        id,

                        name,

                        email,

                        course,

                        marks,

                        students[index]
                            .source,

                        students[index]
                            .image,

                        students[index]
                            .country

                    );

            }

        }

        else {

            students.push(

                new Student(

                    getNextId(
                        students
                    ),

                    name,

                    email,

                    course,

                    marks,

                    "Local"

                )

            );

        }


        saveStudents(
            students
        );


        updateStatistics();


        displayStudents(
            students
        );


        resetForm();

    }
);


/* =====================================
   RESET
===================================== */

const resetForm = () => {

    studentForm.reset();


    studentId.value =
        "";


    submitButton.innerHTML =
        "<span>➕</span> Add Student";


    cancelEdit.classList.add(
        "hidden"
    );

};


cancelEdit.addEventListener(
    "click",
    resetForm
);


/* =====================================
   EDIT
===================================== */

const editStudent =
    id => {

        const student =
            students.find(
                student =>
                    student.id === id
            );


        if (!student) {

            return;

        }


        studentId.value =
            student.id;


        studentName.value =
            student.name;


        studentEmail.value =
            student.email;


        studentCourse.value =
            student.course;


        studentMarks.value =
            student.marks;


        submitButton.innerHTML =
            "<span>💾</span> Update Student";


        cancelEdit.classList.remove(
            "hidden"
        );


        window.scrollTo({

            top: 100,

            behavior: "smooth"

        });

    };


/* =====================================
   DELETE
===================================== */

const deleteStudent =
    id => {

        const student =
            students.find(
                student =>
                    student.id === id
            );


        if (!student) {

            return;

        }


        if (
            !confirm(
                `Delete ${student.name}?`
            )
        ) {

            return;

        }


        students =
            students.filter(
                student =>
                    student.id !== id
            );


        saveStudents(
            students
        );


        updateStatistics();


        displayStudents(
            students
        );

    };


/* =====================================
   SHOW STUDENT PROFILE
===================================== */

const showStudentProfile =
    async id => {

        const student =
            students.find(
                student =>
                    student.id === id
            );


        if (!student) {

            return;

        }


        apiLoading.classList.remove(
            "hidden"
        );


        apiError.classList.add(
            "hidden"
        );


        profileContainer.classList.add(
            "hidden"
        );


        profileEmpty.classList.add(
            "hidden"
        );


        try {

            /*
             * If photo already exists,
             * show same photo.
             */

            if (
                student.image
            ) {

                profileImage.src =
                    student.image;


                profileName.textContent =
                    student.name;


                profileEmail.textContent =
                    student.email;


                profileCountry.textContent =
                    student.country ||
                    "India";


                profileContainer.classList.remove(
                    "hidden"
                );


                return;

            }


            /*
             * Fetch API
             */

            const user =
                await fetchRandomUser();


            /*
             * Save photo to
             * selected student
             */

            student.image =
                user.image;


            student.country =
                user.country;


            saveStudents(
                students
            );


            /*
             * Show selected
             * student's information
             */

            profileImage.src =
                student.image;


            profileName.textContent =
                student.name;


            profileEmail.textContent =
                student.email;


            profileCountry.textContent =
                student.country;


            profileContainer.classList.remove(
                "hidden"
            );


            displayStudents(
                students
            );

        }

        catch (error) {

            console.error(
                error
            );


            apiError.classList.remove(
                "hidden"
            );

        }

        finally {

            apiLoading.classList.add(
                "hidden"
            );

        }

    };


/* =====================================
   TABLE ACTIONS
===================================== */

studentTableBody.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "button"
            );


        if (!button) {

            return;

        }


        const id =
            Number(
                button.dataset.id
            );


        const action =
            button.dataset.action;


        if (
            action === "profile"
        ) {

            showStudentProfile(
                id
            );

        }


        if (
            action === "edit"
        ) {

            editStudent(
                id
            );

        }


        if (
            action === "delete"
        ) {

            deleteStudent(
                id
            );

        }

    }
);


/* =====================================
   SEARCH
===================================== */

searchStudent.addEventListener(
    "input",
    filterStudents
);


/* =====================================
   COURSE
===================================== */

courseFilter.addEventListener(
    "change",
    filterStudents
);


/* =====================================
   CLEAR
===================================== */

clearFilters.addEventListener(
    "click",
    () => {

        searchStudent.value =
            "";


        courseFilter.value =
            "All Courses";


        displayStudents(
            students
        );

    }
);


/* =====================================
   RANDOM API STUDENT
===================================== */

loadApiStudent.addEventListener(
    "click",
    async () => {

        apiLoading.classList.remove(
            "hidden"
        );


        apiError.classList.add(
            "hidden"
        );


        profileContainer.classList.add(
            "hidden"
        );


        profileEmpty.classList.add(
            "hidden"
        );


        try {

            const user =
                await fetchRandomUser();


            profileImage.src =
                user.image;


            profileName.textContent =
                user.fullName;


            profileEmail.textContent =
                user.email;


            profileCountry.textContent =
                user.country;


            profileContainer.classList.remove(
                "hidden"
            );

        }

        catch (error) {

            console.error(
                error
            );


            apiError.classList.remove(
                "hidden"
            );

        }

        finally {

            apiLoading.classList.add(
                "hidden"
            );

        }

    }
);


/* =====================================
   START APP
===================================== */

initializeStudents();