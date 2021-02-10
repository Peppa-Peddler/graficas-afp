var fg = fg || {
    'version': 0.1,
    'controller': {},
    'viz01': {},
    'viz02': {},
    'viz03': {}
};

fg.viz01.appgraph = function(options){

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
        .style("background","#f1f1f1")
        // .style("border","1px solid #333")
	};

    //Padding
    self.left = 5;
    self.right = 5;
    self.top = 5;
    self.bot = 5;

    self.margin = 10;

    self.countries = Object.keys(self.data)
    self.labels = Object.keys(self.data[self.countries[0]])

    $.each(self.countries, function (i, item) {
        $('.switch01 select').append($('<option>', {
            value: item.trim(),
            text : item.trim()
        }));
    });

    self.xsize = self.labels.length
    self.xspan = (self.width - self.margin*( self.xsize - 1 ) - self.right - self.left) / self.xsize
    // self.yspan =  (self.height - self.margin*( self.ysize - 1 ) - self.top - self.bot) / self.ysize

	self.prerender = function(){

        self.poly = self.svg.selectAll('.tag')
                .data(self.labels)
                .enter()
                .append('rect')
                .attr('x', function(d,i){
                    return i*self.xspan + i*self.margin + self.left;
                })
                .attr('width', self.xspan)
                .attr('fill', '#F9B628')
                .style('opacity','1')
	};

	self.render = function(pais){

        var maxH = d3.max( Object.values(self.data[self.countries[i]] ).map(d => +(d.replace(/,/g, ''))) )

        console.log(maxH)

        self.scale = d3.scale.linear()
            .domain([0, maxH])
            .range([0,self.height - self.top - self.bot]);

        self.poly
        .transition()
        .attr('height', function(d,i){
            return self.scale(self.data[pais][self.labels[i]].replace(/,/g, ''))
        })
        .attr('y', function(d,i){
            return self.height - self.bot - self.scale(self.data[pais][self.labels[i]].replace(/,/g, ''))
        })
	};

	self.init();
	return self;
};

var centralGraph01 = fg.viz01.appgraph({
	parentId : "graph01",
	width : $('#graph01').width(),
    data: data01,
	height: 330
});

const init = 'México'

centralGraph01.prerender();
centralGraph01.render(init);
$('.switch01 select').val(init)

$('.switch01 select').change(function(){
    centralGraph01.render($(this).val())
})
