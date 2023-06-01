import { useContext } from "react";
import { LogInContext } from "../../components/LogInContext";

export default function HabitsPage() {
    const {logInStatus} = useContext(LogInContext);

    return (
        <div>
           hábitos 
        </div>
    );
}