export function CtoF(temp){
    return (temp*1.8+32).toFixed(2);
}

export function CtoK(temp){
    return (temp+237.15).toFixed(2);
}

export function FtoC(temp){
    return ((temp-32)*(5/9)).toFixed(2);
}

export function FtoK(temp){
    return (((temp-32)*(5/9))+237.15).toFixed(2)
}

export function KtoC(temp){
    return (temp-237.15).toFixed(2);
}

export function KtoF(temp){
    return ((temp-237.15)*1.8+32).toFixed(2)
}