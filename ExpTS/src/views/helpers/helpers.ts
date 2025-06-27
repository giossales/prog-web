import { DiscType, TechType } from "./helpersTypes";

export function discList(discs: DiscType[]) {
    return `<ul>${(discs
        .map((d) => `<li>${d.nome} - ${d.cg}</li>`))
        .join("")}</ul>`
}

export function techList(techs: TechType[]) {
    return `<ul>${(techs
        .map((t) => {
            if(t.poweredByNodejs) return `<li>${t.name} - ${t.type}</li>`
            else return ''
        }))
        .join("")}</ul>`
}