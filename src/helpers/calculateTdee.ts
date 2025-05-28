import getBmr, { bmrProps } from "@/helpers/getBmr";

interface Props extends bmrProps {
    activity: string;
}

export default function calculateTdee({ weight, height, gender, age, activity }: Props) {
    const bmr = getBmr({
        weight: weight,
        height: height,
        age: age,
        gender: gender,
    })

    const getActivity =
        activity === "sedentary"
            ? 1.2
            : activity === "lightly"
                ? 1.375
                : activity === "moderate"
                    ? 1.55
                    : activity === "active"
                        ? 1.725
                        : 1.9;

    return Math.round(bmr * getActivity);
}