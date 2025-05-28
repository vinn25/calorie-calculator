export interface bmrProps {
    weight: number;
    height: number;
    age: number;
    gender: "MALE" | "FEMALE";
}

export default function getBmr({ weight, height, age, gender }: bmrProps) {
    if (gender === "MALE") {
        return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
}