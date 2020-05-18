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
var getMine = function(entry)
{
    return entry.mine
}

var getSuicide = function(entry)
{
    return entry.suicide
}

var getDrug = function(entry)
{
    return entry.drug
}

var Hopelessness = function(getSuicide, getDrug, entry)
{
    return getSuicide(entry) + getDrug(entry)
}

    
var drawScatter = function(entries,target,xScale,yScale,xProp,yProp)

{
      
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
return xScale(Hopelessness(entry));    
})
.attr("cy",function(entry)
    {
return yScale(getMine(entry));    
    })
.attr("r",4)
.attr("fill", "green")
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
        .domain([0,100])
        .range([graph.height,0])
        
    var xScale = d3.scaleLinear()
        .domain([0,600])
                
        .range([0,graph.width])
           
    createAxes(screen,margins,graph,target,xScale,yScale);

}