project.controller('MainController', ['$scope', function($scope) {
	$scope.filters = {type: 'physical'};
	$scope.links = [
		{
			name: 'about',
		},
		{
			name: 'physical',
		},
		{
			name: 'digital',
		},
		{
			name: 'other',
		},
	];
	$scope.projects = [
	{
	title: 'About',
	type: 'about',
	caption: 'I\'m Mason Sklar, an artist and designer in Minneapolis, Minnesota. I love print and I also love to explore the frontiers of interactive media. I\'m a creative problem solver and believe in the power of collaboration. <br/>I like to do things by hand. I like to learn how things work. I like to help people make things. When we work together, we can make cool stuff and real change! <a href="http://files.masonsklar.com/masonsklar_resume.pdf" target="_blank">Here is my résumé</a> and you can email me and <a href="mailto:me@masonsklar.com">here</a>.',
	data: '<img src="img/me.gif" />'
    },
    {
    title: 'Interactions Manager 2', 
    type: 'digital',
    caption: 'An interaction prototype for a game about complexity and the hidden and misunderstood mechanics of the world. jQuery, jQuery UI and Bodymovin/Lottie. An experiment in interactive SVG animation. Can you get all 8 outcomes? This is the second version of this game, the first version is <a href="controller.html">here</a>.',
    data: '<div id="start"><h1 onclick="startThis()">START</h1></div>'
    },
    {
    title: 'Size-O',
    type: 'digital',
    data: '<a href="http://sizeo.info" target="_blank"><img src="thumbs/sizeo.png"></a>',
    caption: 'Size-O is a web-based paper cutting calculator. I made it to assist in printmaking and bookbinding. Made with jQuery and jQuery UI.'
    },
	{
    title: 'White Ladder', 
    type: 'digital',
    data: '<a href="http://whiteladder.co" target="_blank"><img src="thumbs/whiteladder.png"></a>',
    caption: 'I developed the functionality for this inifinitely-scrolling novelty site designed by <a href="http://vadimgershman.info/">Vadim Gershman</a>.'
    },
    {
    title: 'Dream Navigator', 
    type: 'digital',
    data: '<a href="http://dreamnavigator.info" target="_blank"><img src="thumbs/dreamnavigator.png"></a>',
    caption: 'My senior thesis project from MCAD. A point-and-click adventure through a dream made with jQuery and jQueryUI. 47 pages of ink wash and colored pencil, usable items and multiple endings.'
    },
    {
    title: 'Demo - dynamic logo', 
    type: 'digital',
    caption: 'A dynamic SVG logo for Your Friends, a collaboration with Zach Stoebner.',
    data: '<iframe src="yfiframe.html" frameborder="0" height="280" width="335" scrolling="no"></iframe>'
    },
    {
	title: 'The House Call',
	type: 'physical',
	caption: 'The story of a boy who comes down with a magical illness and the wizard sent to help diagnose and cure him, 24 pages, 2 colors. Produced as a digital comic <a href="http://s3.amazonaws.com/files.masonsklar.com/TheHouseCall_masonsklar.pdf" target="_blank">here</a> and Risographed on my RA5900 <a href="http://gum.co/housecall" target="_blank">here</a>.',
	data: '<a href="http://s3.amazonaws.com/files.masonsklar.com/TheHouseCall_masonsklar.pdf" target="_blank"><img src="img/ecover.png"/></a>'
    },
    {
    title: 'Citizens\' Guide to Useful Arts',
	type: 'physical',
	caption: 'An "in-universe" pamphlet about the numerous ways the magical arts can benefit the life of an average citizen. 8 pages, 2 colors. Produced as a PDF <a href="http://s3.amazonaws.com/files.masonsklar.com/CitizensGuidetoUsefulArts_MasonSklar.pdf" target="_blank">here</a> and Risographed on my RA5900 <a href="http://gum.co/cguide" target="_blank">here</a>.',
	data: '<a href="http://s3.amazonaws.com/files.masonsklar.com/CitizensGuidetoUsefulArts_MasonSklar.pdf" target="_blank"><img src="img/cguidetotal.png"/></a>'
    },
    {
	title: 'Fort',
	type: 'physical',
	caption: 'Robert Oster Melon Tea ink wash',
	data: '<img src="img/fort.jpg"/>'
    },
    {
	title: 'Verdigris',
	type: 'physical',
	caption: 'Rohrer and Klinger Verdigris ink wash',
	data: '<img src="img/verdigrisplants.jpg"/>'
    },
    {
	title: 'Bug and Bean Blossoms',
	type: 'physical',
	caption: 'Various fountain pen and inks',
	data: '<img src="img/bugg.jpg"/>'
    },
    {
	title: 'Daruma',
	type: 'physical',
	caption: '4-color screen print',
	data: '<img src="img/daruma4c.jpg"/>'
    },
    {
	title: 'Water Places',
	type: 'physical',
	caption: '2-color Risograph print, an excerpt from an entirely screenprinted comic.',
	data: '<img src="img/waterplaceriso.jpg"/>'
    },
    {
	title: 'Westscape',
	type: 'physical',
	caption: '2-color screen print',
	data: '<img src="img/westscape.jpg"/>'
    },
    {
	title: 'Lakeside',
	type: 'physical',
	caption: 'Pilot Iroshizuku Yu-yake and Sailor Jentle Yama-dori ink wash',
	data: '<img src="img/lakeside.jpg"/>'
    },
    {
	title: 'Triangle Territory',
	type: 'other',
	caption: 'Animation for <a href="https://hellavisiontelevision.com/">Hellavision Television</a>. Illustrator and After Affects.',
	data: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Cd0sXuGZAjQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
    },
    {
	title: 'Steppin\'',
	type: 'other',
	caption: 'Animation for <a href="https://hellavisiontelevision.com/">Hellavision Television</a>. Illustrator, Photoshop and After Affects.',
	data: '<iframe width="560" height="315" src="https://www.youtube.com/embed/UxKksPi4V3U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    {
	title: 'Wheel of Torture',
	type: 'other',
	caption: 'Animation collaboration with Zach Stoebner for <a href="https://hellavisiontelevision.com/">Hellavision Television</a>. Photoshop and After Affects.',
	data: '<iframe width="560" height="315" src="https://www.youtube.com/embed/_x7ST382JNk" frameborder="0" allowfullscreen></iframe>'
    },
    {
	title: 'Ringout! - Fer-De-Lance',
	type: 'other',
	caption: 'I made some assets for the music video for Twin Cities band Ringout!\'s music video for their single Fer-De-Lance, including the cave, train pushcart, and elevators.',
	data: '<iframe width="560" height="315" src="https://www.youtube.com/embed/IPXJ7l7CgMM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    }
  ];
}]);