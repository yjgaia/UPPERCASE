TestBox.MAIN = ->

	TestBox.TestModel.create
		name : 'YJ Sim'
		age : 27
		isMan : true
	, (data) -> 
		console.log data

		TestBox.TestModel.get
			filter :
				age : 27
		, (data) -> 
			console.log data

	TestBox.TestModel.find (data) ->
		console.log data

	div = DIV ->
		DIV ->
			'test1'
		DIV ->
			'test2'
		'test3'

	div.appendTo BODY
