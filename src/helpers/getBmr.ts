export interface bmrProps {
    weight: number;
    height: number;
    age: number;
    gender: "male" | "female";
}

export default function getBmr({ weight, height, age, gender }: bmrProps) {
    if (gender === "male") {
        return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        return 10 * weight + 6.25 * height - 5 * age - 161;
    }
}