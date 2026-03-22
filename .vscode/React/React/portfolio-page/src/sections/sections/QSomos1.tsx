import { Button } from "components/ui/button";
import { IconDatabaseFilled } from "@tabler/icons-react";
import { CircleArrowUpIcon } from "lucide-react";


//QSomos es = arrow function
const QSomos = () => {
    return (
        // la funcion devuelve
        <section id="qsomos" className="min-h-screen flex items-center justify-center flex-col">
            <h1>Quienes somos</h1>
            <Button variant="destructive">Quienes somos</Button>
            <Button variant="secondary" size='icon'>
                <CircleArrowUpIcon/>
                <IconDatabaseFilled/>
            </Button>
        </section>
    )

}
export default QSomos;

// funcion de flecha de JS (arrow function)
// version mas moderna de JS
