var dataPromise= d3.json("wvdata.json");
    dataPromise.then (function(entries){
            console.log("worked"); 
        console.log(entries);
            initGraph("#graph",entries);
        },
        function(err){
            console.log("failed", err);
        }
    )


var setBanner = function(msg)
{
    d3.select("#spread h2")
        .text(msg);
}

var drawScatter = function(entries,target,xScale,yScale,xProp,yProp)

{
setBanner(xProp.toUpperCase() +" vs "+ yProp.toUpperCase());   
    
var circles = d3.select("#graph .graph")
.selectAll("circle")
.data(entries)
circles.enter()
  .append("circle");
circles.exit()
  .remove();

d3.select("#graph")
.select("g.graph")
.selectAll("circle")
.transition()
.duration(700)
.attr("cx", function(entry)
{
return xScale(entry[xProp]);    
})
.attr("cy",function(entry)
    {
return yScale(entry[yProp]);    
    })
.attr("r",4)
.attr("fill", "green")
/*.on("mouseover", function(d){
    svg.append("text")
        .attr("id","tooltip")
        .text(d.year)
})
.on("mouseout", function(d){
    d3.select("#tooltip").remove();
})*/
}


var createAxes = function(screen,margins,graph,
                           target,xScale,yScale)
{
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    var axes = d3.select(target)
        .append("g")
    axes.append("g")
        .attr("transform","translate("+margins.left+","
             +(margins.top+graph.height)+")")
        .call(xAxis)
    axes.append("g")
        .attr("transform","translate("+margins.left+","
             +(margins.top)+")")
        .call(yAxis)
}

var initGraph = function(target,entries)
{
    var screen = {width:950, height:400};
    
    var margins = {top:15,bottom:40,left:70,right:15};
    
    var graph = 
    {
        width:screen.width-margins.left-margins.right,
        height:screen.height-margins.top-margins.bottom,
    }
    

    d3.select(target)
        .attr("width",screen.width)
        .attr("height",screen.height)
    
    var g = d3.select(target)
        .append("g")
        .classed("graph",true)
        .attr("transform","translate("+margins.left+","+
             margins.top+")");
        
        var yScale = d3.scaleLinear()
        .domain([0,50])
        .range([graph.height,0])
        
    var xScale = d3.scaleLinear()
        .domain([0,600])
                
        .range([0,graph.width])
           

  
    
    createAxes(screen,margins,graph,target,xScale,yScale);
    
    initButtons(entries,target,xScale,yScale);
    
    setBanner("Click buttons to view graphs");
    

}

var initButtons = function(entries,target,xScale,yScale)
{
    
    d3.select("#suicide")
    .on("click",function()
    {
        drawScatter(entries,target,
              xScale,yScale,"mines","suicide");
    })
    
    d3.select("#drug")
    .on("click",function()
    {
        drawScatter(entries,target,
              xScale,yScale,"mines","drug");
    })
    
    d3.select("#air")
    .on("click",function()
    {
        drawScatter(entries,target,
              xScale,yScale,"mines","air");
    })

}





/*var tooltip = d3.selectAll("circle")
.append("text")
.text("entry")
.style("opacity", 0)
.attr("class","tooltip")

var mouseover = function(entry)
{
    tooltip
    .style("opacity",0)
    .text("hi");
}

var mouseleave= function(entry)
{
 tooltip
 .style("opacity",0)
}*/
