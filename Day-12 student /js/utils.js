 export const escapeHTML = value => {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        value;

    return div.innerHTML;

};


export const getGradeClass = grade => {

    return `grade-${grade}`;

};


export const calculateAverage = students => {

    if (
        students.length === 0
    ) {

        return 0;

    }


    const total =
        students.reduce(
            (sum, student) => {

                return (
                    sum +
                    Number(
                        student.marks
                    )
                );

            },
            0
        );


    return (
        total /
        students.length
    );

};


export const getNextId = students => {

    if (
        students.length === 0
    ) {

        return 1;

    }


    return (
        Math.max(
            ...students.map(
                student =>
                    Number(
                        student.id
                    )
            )
        ) + 1
    );

};