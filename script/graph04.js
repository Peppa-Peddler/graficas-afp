fg.viz04.appgraph = function(options){

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
    self.left = 0;
    self.right = 0;
    self.top = 0;
    self.bot = 20;

    self.margin = 50;

    self.xsize = self.labels.length
    // self.xspan = (self.width - self.margin*( self.xsize - 1 ) - self.right - self.left) / self.xsize
    self.xspan =  (self.width - self.margin*( self.xsize - 1 ) - self.left - self.right) / self.xsize

	self.prerender = function(){

        self.maxH = 100

        self.scale = d3.scale.linear()
                    .domain([0, self.maxH])
                    .range([0,self.height - self.bot - self.top]);


		self.svg.selectAll('.tag')
				.data(labels)
				.enter()
				.append('rect')
			    .attr('y', self.top)
				.attr('x', function(d,i){
				    return i*self.xspan + i*self.margin + self.left;
				})
				.attr('width', self.xspan)
				.attr('height', function(d,i){
					return self.scale(self.data[i][0])
				})
				.attr('fill', '#000')
				 .style('opacity','0.7');

		self.svg.selectAll('.tag')
				.data(labels)
				.enter()
				.append('rect')
	            .attr('y', function(d,i){
					return self.top + self.scale(self.data[i][0])
				})
				.attr('x', function(d,i){
		        	return i*self.xspan + i*self.margin + self.left;
		        })
				.attr('width', self.xspan)
		        .attr('height', function(d,i){
					return self.scale(self.data[i][1])
				})
		        .attr('fill', '#000')
		        .style('opacity','0.5');

		self.svg.selectAll('.tag')
				.data(labels)
				.enter()
				.append('rect')
			    .attr('y', function(d,i){
					return self.top + self.scale(self.data[i][0]) + self.scale(self.data[i][1])
				})
				.attr('x', function(d,i){
				    return i*self.xspan + i*self.margin + self.left;
				})
				.attr('width', self.xspan)
				.attr('height', function(d,i){
					return self.height - self.top - self.bot - self.scale(self.data[i][1]) - self.scale(self.data[i][0])
				})
				.attr('fill', '#F9B628')
				.style('opacity','1');

		self.svg.selectAll('.tag')
				.data(labels)
				.enter()
				.append('text')
				.attr('x', function(d,i){
					return i*self.xspan + i*self.margin + self.left + self.xspan/2;
				})
				.attr('y', function(d,i){
				    return  self.scale(self.data[i][0])/2;
				})
				.attr('font-size', '10px')
				.style('font-weight', '400')
				.text(function(d,i){return self.data[i][0] + " %"})
				.attr('fill','#fff')
				.attr('text-anchor','middle');

				self.svg.selectAll('.tag')
						.data(labels)
						.enter()
						.append('text')
						.attr('x', function(d,i){
							return i*self.xspan + i*self.margin + self.left + self.xspan/2;
						})
						.attr('y', function(d,i){
						    return  self.scale(self.data[i][0]) + self.scale(self.data[i][1])/2;
						})
						.attr('font-size', '10px')
						.style('font-weight', '400')
						.text(function(d,i){return self.data[i][1] + " %"})
						.attr('fill','#fff')
						.attr('text-anchor','middle');

						self.svg.selectAll('.tag')
								.data(labels)
								.enter()
								.append('text')
								.attr('x', function(d,i){
									return i*self.xspan + i*self.margin + self.left + self.xspan/2;
								})
								.attr('y', function(d,i){
								    return  self.scale(self.data[i][0]) + self.scale(self.data[i][1]) + self.scale(self.data[i][2])/2;
								})
								.attr('font-size', '10px')
								.style('font-weight', '700')
								.text(function(d,i){return self.data[i][2] + " %"})
								.attr('fill','#111')
								.attr('text-anchor','middle');


								self.svg.selectAll('.tag')
										.data(labels)
										.enter()
										.append('text')
										.attr('x', function(d,i){
											return i*self.xspan + i*self.margin + self.left + self.xspan/2;
										})
										.attr('y', function(d,i){
										    return self.height - 2;
										})
										.attr('font-size', '10px')
										.style('font-weight', '400')
										.text(function(d,i){return self.labels[i]})
										.attr('fill','#111')
										.attr('text-anchor','middle');

	};

	self.render = function(){
	};

	self.init();
	return self;
};

var activosGraph04 = fg.viz04.appgraph({
	parentId : "graph04",
	width : $('#graph04').width(),
    labels: labels04,
    data: data04,
	height: 330
});

activosGraph04.prerender();
