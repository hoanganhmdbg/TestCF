import data from './data.js';
var temp = [];
for (let i = 0; i < data.length; i++) {
    temp.push(data[i]);
}


for (let i = 0; i < data.length - 1; i++) {
    for (let j = i + 1; j < data.length; j++) {
        if (data[i].point < data[j].point) {
            let temp = data[i];
            data[i] = data[j];
            data[j] = temp;
        } else if (data[i].point == data[j].point) {
            if (data[i].GD < data[j].GD) {
                let temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            } else if (data[i].GD == data[j].GD) {
                if (data[i].name > data[j].name) {
                    let temp = data[i];
                    data[i] = data[j];
                    data[j] = temp;
                }
            }
        }
    }
}
for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < temp.length; j++) {
        if(data[i].name == temp[j].name){
            temp[j].position = i +1;
            break;
        }
    }
}

console.log(temp);

// data.sort((a,b) => {
//     if(a.point > b.point){
//         return a.point - b.point;
//     }else if(a.point == b.point){
//         if(a.GD > b.GD){
//             return a.GD - b.GD;
//         } else if (a.GD == b.GD){
//             if(a.name < b.name){
//                 return -1;
//             }
//         }
//     }
// });
// console.log(data);