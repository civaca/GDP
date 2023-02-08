
let dataset=[]
document.addEventListener('DOMContentLoaded',()=>{
   //Fetching API data
     fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
    .then(response=>response.json())
    .then(data=>{ 
        console.log(data)
        dataset=[...data.data]
    
// Creating SVG
        const w=800;
        const h=500;
        const padding=40;
        const svg =d3.select("body")
                        .append("svg")
                        .attr("width",w)
                        .attr("height",h)
                        .style("padding",20)

        
        const tooltip=d3.select("body")
        .append("div")
        .attr("id","tooltip")
        .style("opacity",0)

     //scales
        const xScale=d3.scaleTime().domain([d3.min(dataset,(d)=>new Date(d[0])),d3.max(dataset,(d)=>new Date(d[0]))])
        .range([padding,w-padding])
        const yScale=d3.scaleLinear().domain([0,d3.max(dataset,d=>d[1])])
        .range([h-padding, padding])

       
        //axis 
     const xAxis=d3.axisBottom(xScale)
     const yAxis=d3.axisLeft(yScale)
          
        
        svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class","bar ")
        .attr("data-date", (d)=>d[0])
        .attr("data-gdp", (d)=>d[1])
        .attr("x",(d,i)=>xScale(new Date(d[0])))
        .attr("y",(d,i)=>yScale(d[1]))
        .attr("width",2)
        .attr("height",(d,i)=>h-padding-yScale(d[1]))
        .attr("fill","#19647e")
        .on("mouseover",(event,d)=>{

           
          tooltip.transition().duration(300)//transition between states 
          .style("opacity",1).style("top",event.clientY+"px").style("left",event.clientX+10+"px")
          .style("width",90+"px")
          .style("height",52+"px")
          .text(d[0]+" GPD: $ "+d[1]+" B")
          .attr("data-date", d[0])
        
       
    }).on("mouseout",(event,d)=>{

        tooltip.style("opacity",0)
    })
        



        
        svg.append("g")
        .attr("transform", "translate(0," + (h-padding) + ")")
        .call(xAxis)
        .attr("id","x-axis")

        svg.append("g")
        .attr("transform", "translate("+padding+",0)")
        .call(yAxis)
        .attr("id","y-axis")
  
       

    });//succesful fetching

})  //ContentLoaded
