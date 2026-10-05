export class Student {

    constructor(
        id,
        name,
        email,
        course,
        marks,
        source = "Local",
        image = "",
        country = ""
    ) {

        this.id = id;

        this.name = name;

        this.email = email;

        this.course = course;

        this.marks = Number(marks);

        this.source = source;

        this.image = image;

        this.country = country;
    }


    getGrade() {

        if (this.marks >= 90) {

            return "A";

        }

        if (this.marks >= 80) {

            return "B";

        }

        if (this.marks >= 70) {

            return "C";

        }

        if (this.marks >= 60) {

            return "D";

        }

        return "F";
    }

}


/* =====================================
   DEFAULT STUDENTS
===================================== */

export const defaultStudents = [

    new Student(
        1,
        "Rahul Patel",
        "rahul@gmail.com",
        "Computer Science",
        92
    ),

    new Student(
        2,
        "Priya Shah",
        "priya@gmail.com",
        "Information Technology",
        84
    ),

    new Student(
        3,
        "Amit Kumar",
        "amit@gmail.com",
        "Mechanical",
        76
    ),

    new Student(
        4,
        "Neha Joshi",
        "neha@gmail.com",
        "Civil",
        65
    )

];