// 1,0 - leżący lub siedzący tryb życia, brak aktywności fizycznej
// 1,2 - praca siedząca, aktywność fizyczna na niskim poziomie
// 1,4 - praca nie fizyczna, trening 2 razy w tygodniu
// 1,6 - lekka praca fizyczna, trening 3-4 razy w tygodniu
// 1,8 - praca fizyczna, trening 5 razy w tygodniu
// 2,0 - ciężka praca fizyczna, codzienny trening
//0,2 budowanie masy/redukcja

function BMI(height, weight)
{
var bmi = weight /height*height;

};


function ZK(height,weight,old)
{
var zkm=66.5 + (13,7 * weight) + (5 * height) - (6,8 * old)
var zkk =65.5 +(9,6 * weight) + (1,85 * height) - (4,7 * old)
return zkm, zkk;
}

export{BMI,zkm, zkk};