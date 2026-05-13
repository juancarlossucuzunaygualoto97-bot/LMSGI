
//2-. Idem anterior pero con arrow function  

import { Button } from "@/components/ui/button";
import { CircleFadingArrowUpIcon, PrinterCheck } from "lucide-react";
import { IconGitBranch, IconDatabaseFilled } from "@tabler/icons-react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

//codigo TS o JS
const QSomos = () => {
    //codigo TS o JS
    return (
        //Mezclaremos codigo html + componentes de Tailwind + codigo TS o JS
        <section id="qsomos" className="min-h-screen flex items-center justify-center flex-col">
            <h1 className="text-4xl font-bold">Quienes Somos</h1>
            <Button variant="bluex">Quienes Somos3</Button>
            <Button variant="secondary" size="icon">
                {/* <CircleFadingArrowUpIcon />
                <IconDatabaseFilled /> */}
                <PrinterCheck />
            </Button>
            <Button variant="secondary" size="sm">
                <IconGitBranch /> New Branch
            </Button>
    <Card className="w-full max-w-sm">
    <CardHeader>
        <CardTitle>Iniciar Login</CardTitle>
        <CardDescription>
            Introduce tu email y contraseña para iniciar sesión en tu cuenta.
        </CardDescription>
        <CardAction>
            <Button variant="link">Registrarse</Button>
        </CardAction>
    </CardHeader>
    <CardContent>
        <form>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <Input id="password" type="password" required />
                </div>
            </div>
        </form>
    </CardContent>
    <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
            Login
        </Button>
        <Button variant="outline" className="w-full">
            Login with Google
        </Button>
    </CardFooter>
</Card>

        </section>
    )
}

export default QSomos;

//1-. forma de definir un componente React con funcion JS tradicional
// function QSomos(){
    
//     return(
    
//     )
// }

// export default QSomos;

//2-. Idem anterior pero con funcio + exportacion directa
// export default function QSomos1(){

//     return (

//     )
// }

