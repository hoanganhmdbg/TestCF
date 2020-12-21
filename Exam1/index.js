let a = prompt('nhap day thu nhat');
let b = prompt('nhap day thu hai');

a = a.split(',');
b = b.split(',');

c = a.filter((a) => {
    let check = false
    b.forEach((x) => {
        if(a == x){
            check = true;
        }
    })
    if(!check){
        return a;
    }
})

d = b.filter((b) => {
    let check = false
    a.forEach((x) => {
        if(b == x){
            check = true;
        }
    })
    if(!check){
        return b;
    }
})

console.log(...c,...d);
