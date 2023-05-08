interface forules {
    username: {
        type: string;
        message: string;
        required: boolean;
        trigger: string;
    }[];
    password: ({
        required: boolean;
        message: string;
        trigger: string;
        min?: undefined;
        max?: undefined;
    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;
        required?: undefined;
    })[];
    code: ({
        required: boolean;
        message: string;
        trigger: string;
    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;
    })[];
}

// 校验规则
export const forules = ref<forules>({
    username: [
        {
            type: "email",
            message: "Email is incorrect...",
            required: true,
            trigger: "blur",
        },
    ],
    password: [
        {
            required: true,
            message: "Password could not be empty...",
            trigger: "blur",
        },
        {
            min: 6,
            max: 30,
            message: "Password's length has to be 6 to 30 characters...",
            trigger: "blur",
        },
    ],
    code: [
        {
            required: true,
            message: "Password could not be empty...",
            trigger: "blur",
        },
        {
           
            min:6,
            max:6,
            message: "code's length has to be 6 characters...",
            trigger: "blur",
        },
    ]
});