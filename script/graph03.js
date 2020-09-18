fg.viz03.appgraph = function(options){

	var self = {};

	for (var key in options) {
		self[key] = options[key];
	}

	self.parentSelect = "#" + self.parentId;

    console.log(self.parentSelect)

	self.init = function(){

	self.svg = d3.select(self.parentSelect).append("svg")
		.attr("id", "appgraph")
		.attr("width", self.width)
		.attr("height", self.height)
        .style("background","none")
        // .style("border","1px solid #333")
		;
	};

    //Padding
    self.left = 80;
    self.right = 10;
    self.top = 0;
    self.bot = 0;

    self.margin = 10;

    self.ysize = self.labels.length
    // self.xspan = (self.width - self.margin*( self.xsize - 1 ) - self.right - self.left) / self.xsize
    self.yspan =  (self.height - self.margin*( self.ysize - 1 ) - self.top - self.bot) / self.ysize

	self.prerender = function(){

        self.years = Object.keys(self.data)

        self.maxH = -1

        for( var i = 0; i < self.years.length; i++ )
            self.maxH = Math.max( self.maxH , d3.max(self.data[self.years[i]]))

        self.scale = d3.scale.linear()
                    .domain([0, self.maxH])
                    .range([0,self.width - self.left - self.right]);


        self.rect = self.svg.selectAll('.tag')
                    .data(labels)
                    .enter()
                    .append('line')
                    .attr('stroke','#ddd')
                    .attr('stroke-width','1')

		self.poly = self.svg.selectAll('.tag')
				.data(labels)
				.enter()
				.append('rect')
                .attr('x', self.left)
                .attr('y', function(d,i){
                    return i*self.yspan + i*self.margin + self.top;
                })
                .attr('height', self.yspan)
                .attr('fill', '#F9B628')
        		.style('opacity','1')

        self.imgs = self.svg.selectAll('.tag')
                .data(labels)
                .enter()
                .append('svg:image')
                .attr('x', 0)
                .attr('y', function(d,i){
                    return i*self.yspan + i*self.margin + self.top;
                })
                .attr('height', self.yspan)
                .attr('width', 70)
                .attr("xlink:href", function(d){
                    return "images/"+d+".png";
                })


        self.text = self.svg.selectAll('.tag')
                .data(labels)
                .enter()
                .append('text')
                .attr('y', function(d,i){
                    return (i+0.5)*self.yspan + i*self.margin + self.top - 4;
                })
                .attr('font-size', '10px')
                .style('font-weight', '400');

        self.titles = self.svg.selectAll('.tag')
                        .data(labels)
                        .enter()
                        .append('text')
                        .attr('y', function(d,i){
                            return (i+0.5)*self.yspan + i*self.margin + self.top + 10;
                        })
                        .attr('fill', '#222')
                        .style('font-weight', '700')
                        .text(function(d){
                            return d
                        });

	};

	self.render = function(year){
        self.poly
        .transition()
        .attr('width', function(d,i){
            return self.scale(self.data[year][i])
        })

        // self.imgs.attr('x', function(d,i){
        //     return self.left + self.scale(self.data[year][i]) + 10
        // })

        self.ratio = 4

        self.text
            .transition()
            .attr('x', function(d,i){
                let factor = (+self.data[year][i])*self.ratio > self.maxH ? -10 : 10;
                return self.left + self.scale(self.data[year][i]) - 1 + factor
            })
            .text(function(d,i){
                return self.data[year][i]
            })
            .attr('fill', function(d,i){
                return (+self.data[year][i])*self.ratio > self.maxH ? '#fff':'#000';
            })
            .style('text-anchor', function(d,i){
                return (+self.data[year][i])*self.ratio > self.maxH ? 'end':'start'
            })

        self.titles
            .transition()
            .attr('x', function(d,i){
                let factor = (+self.data[year][i])*self.ratio > self.maxH ? -10 : 10;
                return self.left + self.scale(self.data[year][i]) - 1 + factor
            })
            .attr('font-size', '9px')
            .style('letter-spacing', '0.4px')
            .style('text-anchor', function(d,i){
                return (+self.data[year][i])*self.ratio > self.maxH ? 'end':'start'
            })


	};

	self.init();
	return self;
};

var activosGraph03 = fg.viz03.appgraph({
	parentId : "graph03",
	width : $('#graph03').width(),
    labels: labels,
    data: data03,
	height: 330
});

activosGraph03.prerender();
activosGraph03.render(2020);

$('.switch03 span').click(function(){
    $('.switch03 .selected').removeClass('selected')
    $(this).addClass('selected')
    activosGraph03.render($(this).text())
})
