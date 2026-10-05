const STORAGE_KEY =
    "student_management_data";


export const saveStudents = students => {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(students)
    );

};


export const loadStudents = () => {

    const data =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (!data) {

        return [];

    }


    return JSON.parse(data);

};


export const removeStudents = () => {

    localStorage.removeItem(
        STORAGE_KEY
    );

};