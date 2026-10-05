const API_URL =
    "https://randomuser.me/api/";


export const fetchRandomUser = async () => {

    try {

        const response =
            await fetch(
                API_URL
            );


        if (!response.ok) {

            throw new Error(
                "API request failed"
            );

        }


        const data =
            await response.json();


        const user =
            data.results[0];


        return {

            firstName:
                user.name.first,

            lastName:
                user.name.last,

            fullName:
                `${user.name.first} ${user.name.last}`,

            email:
                user.email,

            country:
                user.location.country,

            image:
                user.picture.large

        };

    }

    catch (error) {

        console.error(
            "API Error:",
            error
        );

        throw error;

    }

};