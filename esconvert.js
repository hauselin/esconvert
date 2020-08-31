// see https://stackoverflow.com/questions/9311968/changing-inputs-value-based-on-another-inputs-value

const dp = 3;

function cdf_normal(x, mean, stdev) {
    return (1 - math.erf((mean - x) / (Math.sqrt(2) * stdev))) / 2
}

function num2str(x, dp) {
    return x.toFixed(dp).toString();
}

// formula
function d_r(x) {
    return x / Math.sqrt(x ** 2 + 4)
}

function d_f(x) {
    return x / 2;
}

function d_or(x) {
    return Math.exp(d_logor(x));
}

function d_logor(x) {
    return x * Math.PI / Math.sqrt(3);
}

function d_auc(x) {
    return cdf_normal(x / Math.sqrt(2), 0, 1);
}

function d_fisherz(x) {
    const r = d_r(x);
    return 0.5 * (Math.log(1 + r) - Math.log(1 - r));
}

// https://stackoverflow.com/questions/61952646/is-there-a-javascript-implementation-for-rs-qnorm-function
function qnorm(p) {
    p = parseFloat(p);
    var split = 0.42;
    var a0 = 2.50662823884;
    var a1 = -18.61500062529;
    var a2 = 41.39119773534;
    var a3 = -25.44106049637;
    var b1 = -8.47351093090;
    var b2 = 23.08336743743;
    var b3 = -21.06224101826;
    var b4 = 3.13082909833;
    var c0 = -2.78718931138;
    var c1 = -2.29796479134;
    var c2 = 4.85014127135;
    var c3 = 2.32121276858;
    var d1 = 3.54388924762;
    var d2 = 1.63706781897;
    var q = p - 0.5;

    var r, ppnd;

    if (Math.abs(q) <= split) {
        r = q * q;
        ppnd = q * (((a3 * r + a2) * r + a1) * r + a0) / ((((b4 * r + b3) * r + b2) * r + b1) * r + 1);
    } else {
        r = p;
        if (q > 0) r = 1 - p;
        if (r > 0) {
            r = Math.sqrt(-Math.log(r));
            ppnd = (((c3 * r + c2) * r + c1) * r + c0) / ((d2 * r + d1) * r + 1);
            if (q < 0) ppnd = -ppnd;
        } else {
            ppnd = 0;
        }
    }
    return ppnd;
}

// change elements when d is updated
function es_d(x) {
    x = Number(x);
    // update r
    document.getElementById("pearsonr").value = num2str(d_r(x), dp);
    // update r2
    document.getElementById("r2").value = num2str(d_r(x) ** 2, dp);
    // update f
    document.getElementById("cohenf").value = num2str(d_f(x), dp);
    // update oddsratio
    document.getElementById("oddsratio").value = num2str(d_or(x), dp);
    // update log oddsratio
    document.getElementById("log-odds-ratio").value = num2str(d_logor(x), dp);
    // update auc
    document.getElementById("auc").value = num2str(d_auc(x), dp);
    // update fisherz
    document.getElementById("fisherz").value = num2str(d_fisherz(x), dp);

    // update d
    document.getElementById("cohend").value = num2str(x, dp); 
}

function r_d(x) {
    return (2 * x) / (Math.sqrt(1 - x ** 2))
}

// change elements when r is updated
function es_r(x) {
    x = Number(x);
    const d = r_d(x);
    // update d
    document.getElementById("cohend").value = num2str(d, dp);
    // update r2
    document.getElementById("r2").value = num2str(d_r(d) ** 2, dp);
    // update f
    document.getElementById("cohenf").value = num2str(d_f(d), dp);
    // update oddsratio
    document.getElementById("oddsratio").value = num2str(d_or(d), dp);
    // update log oddsratio
    document.getElementById("log-odds-ratio").value = num2str(d_logor(d), dp);
    // update auc
    document.getElementById("auc").value = num2str(d_auc(d), dp);
    // update fisherz
    document.getElementById("fisherz").value = num2str(d_fisherz(d), dp);

    // update r
    document.getElementById("pearsonr").value = num2str(x, dp);
}

// change elements when r2 is updated
function es_r2(x) {
    x = Number(x);
    const r = Math.sqrt(x);
    const d = r_d(r);
    // update d
    document.getElementById("cohend").value = num2str(d, dp);
    // update r
    document.getElementById("pearsonr").value = num2str(r, dp);
    // update f
    document.getElementById("cohenf").value = num2str(d_f(d), dp);
    // update oddsratio
    document.getElementById("oddsratio").value = num2str(d_or(d), dp);
    // update log oddsratio
    document.getElementById("log-odds-ratio").value = num2str(d_logor(d), dp);
    // update auc
    document.getElementById("auc").value = num2str(d_auc(d), dp);
    // update fisherz
    document.getElementById("fisherz").value = num2str(d_fisherz(d), dp);

    // update r2
    document.getElementById("r2").value = num2str(x, dp);
}

// change elements when cohenf is updated
function es_f(x) {
    const d = 2 * x;
    // update d
    document.getElementById("cohend").value = num2str(d, dp);
    // update r
    document.getElementById("pearsonr").value = num2str(d_r(d), dp);
    // update r2
    document.getElementById("r2").value = num2str(d_r(d) ** 2, dp);
    // update oddsratio
    document.getElementById("oddsratio").value = num2str(d_or(d), dp);
    // update log oddsratio
    document.getElementById("log-odds-ratio").value = num2str(d_logor(d), dp);
    // update auc
    document.getElementById("auc").value = num2str(d_auc(d), dp);
    // update fisherz
    document.getElementById("fisherz").value = num2str(d_fisherz(d), dp);
    
    // update f
    document.getElementById("cohenf").value = num2str(x, dp);
}


// change elements when oddsratio is updated
function es_or(x) {
    const logor = Math.log(x)
    const d = logor * Math.sqrt(3) / Math.PI;
    // update d
    document.getElementById("cohend").value = num2str(d, dp);
    // update r
    document.getElementById("pearsonr").value = num2str(d_r(d), dp);
    // update r2
    document.getElementById("r2").value = num2str(d_r(d) ** 2, dp);
    // update f
    document.getElementById("cohenf").value = num2str(d_f(d), dp);
    // update log oddsratio
    document.getElementById("log-odds-ratio").value = num2str(d_logor(d), dp);
    // update auc
    document.getElementById("auc").value = num2str(d_auc(d), dp);
    // update fisherz
    document.getElementById("fisherz").value = num2str(d_fisherz(d), dp);

    // update oddsratio
    document.getElementById("oddsratio").value = num2str(x, dp);
}


// change elements when log-odds-ratio is updated
function es_logor(x) {
    const d = x * Math.sqrt(3) / Math.PI;
    // update d
    document.getElementById("cohend").value = num2str(d, dp);
    // update r
    document.getElementById("pearsonr").value = num2str(d_r(d), dp);
    // update r2
    document.getElementById("r2").value = num2str(d_r(d) ** 2, dp);
    // update f
    document.getElementById("cohenf").value = num2str(d_f(d), dp);
    // update oddsratio
    document.getElementById("oddsratio").value = num2str(Math.exp(x), dp);
    // update auc
    document.getElementById("auc").value = num2str(d_auc(d), dp);
    // update fisherz
    document.getElementById("fisherz").value = num2str(d_fisherz(d), dp);

    // update log oddsratio
    document.getElementById("log-odds-ratio").value = num2str(x, dp);
}


// change elements when auc is updated
function es_auc(x) {

    const d = qnorm(x) * Math.sqrt(2) // assumes equal sample size (Ruscio 2008)

    // update d
    document.getElementById("cohend").value = num2str(d, dp);
    // update r
    document.getElementById("pearsonr").value = num2str(d_r(d), dp);
    // update r2
    document.getElementById("r2").value = num2str(d_r(d) ** 2, dp);
    // update f
    document.getElementById("cohenf").value = num2str(d_f(d), dp);
    // update oddsratio
    document.getElementById("oddsratio").value = num2str(d_or(d), dp);
    // update log oddsratio
    document.getElementById("log-odds-ratio").value = num2str(d_logor(d), dp);
    // update fisherz
    document.getElementById("fisherz").value = num2str(d_fisherz(d), dp);

    // update auc
    document.getElementById("auc").value = num2str(x, dp);
}


// change elements when fisherz is updated
function es_fisherz(x) {
    const r = (Math.exp(x / 0.5) - 1) / (Math.exp(x / 0.5) + 1);
    const d = r_d(r);
    // update d
    document.getElementById("cohend").value = num2str(d, dp);
    // update r
    document.getElementById("pearsonr").value = num2str(r, dp);
    // update r2
    document.getElementById("r2").value = num2str(r ** 2, dp);
    // update f
    document.getElementById("cohenf").value = num2str(d_f(d), dp);
    // update oddsratio
    document.getElementById("oddsratio").value = num2str(d_or(d), dp);
    // update log oddsratio
    document.getElementById("log-odds-ratio").value = num2str(d_logor(d), dp);
    // update auc
    document.getElementById("auc").value = num2str(d_auc(d), dp);

    // update fisherz
    document.getElementById("fisherz").value = num2str(x, dp);
}