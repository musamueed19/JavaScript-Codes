// Interface describing indexables
interface State<R> {
    [key: string]: R;
}

const state1: State<boolean> = {
    isFinite: true,
    isAlive: false
}


console.log(state1)


