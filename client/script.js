/* ================= GLOBAL VARIABLE ================= */
let selectedNodeName = "";


/* ================= RUN AFTER PAGE LOAD ================= */
document.addEventListener("DOMContentLoaded", function(){

/* ================= LOGIN FUNCTION ================= */
window.login = function () {
let user = document.getElementById("username")?.value;
let pass = document.getElementById("password")?.value;

if(user && pass){
window.location.href = "dashboard.html";
}else{
alert("Enter username and password");
}
};


/* ================= DASHBOARD SEARCH ================= */
window.goToTopic = function () {

let input = document.querySelector(".search-bar input");

if(!input){
alert("Search box not found");
return;
}

let topic = input.value.trim();

if(topic === ""){
alert("Enter topic");
return;
}

window.location.href = "topic.html?topic=" + encodeURIComponent(topic);
};


/* ================= TOPIC PAGE FLOWCHART ================= */

const networkDiv = document.getElementById("network");

if(networkDiv){

// Get searched topic
const params = new URLSearchParams(window.location.search);
let topic = params.get("topic") || "Knowledge";

// Set heading
let title = document.getElementById("topicTitle");
if(title){
title.innerText = topic + " Flow";
}

// Check graph library loaded
if(typeof vis === "undefined"){
alert("Graph library not loaded. Check internet connection.");
return;
}

/* Nodes */
const nodes = new vis.DataSet([
{id:1,label:topic},
{id:2,label:"Concept"},
{id:3,label:"Types"},
{id:4,label:"Examples"},
{id:5,label:"Applications"},
{id:6,label:"Advantages"},
{id:7,label:"Disadvantages"}
]);

/* Connections */
const edges = new vis.DataSet([
{from:1,to:2},
{from:1,to:3},
{from:2,to:4},
{from:2,to:5},
{from:3,to:6},
{from:3,to:7}
]);

const data = { nodes, edges };

const options = {
nodes:{
shape:"dot",
size:25,
font:{size:16}
},
edges:{
smooth:true
},
physics:{
enabled:true
}
};

/* Create graph */
const network = new vis.Network(networkDiv,data,options);

/* Node click event */
network.on("click",function(params){
if(params.nodes.length > 0){
let id = params.nodes[0];
selectedNodeName = nodes.get(id).label;

document.getElementById("outputBox").innerText =
selectedNodeName + " selected. Choose Notes / Description / Explanation.";
}
});
}


/* ================= INFO BUTTONS ================= */

window.showNotes = function(){
if(!selectedNodeName){
alert("Select a node first");
return;
}

document.getElementById("outputBox").innerText =
"📝 Notes for " + selectedNodeName +
"\n\n• Key points\n• Important ideas\n• Quick summary";
};

window.showDescription = function(){
if(!selectedNodeName){
alert("Select a node first");
return;
}

document.getElementById("outputBox").innerText =
"📘 Description of " + selectedNodeName +
"\n\nDefinition and basic concept of the topic.";
};

window.showExplanation = function(){
if(!selectedNodeName){
alert("Select a node first");
return;
}

document.getElementById("outputBox").innerText =
"📚 Full Explanation of " + selectedNodeName +
"\n\nDetailed explanation with examples and theory.";
};

});
