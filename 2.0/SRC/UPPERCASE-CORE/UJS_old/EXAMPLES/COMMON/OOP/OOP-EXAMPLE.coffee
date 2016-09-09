Simple = CLASS(

  init: (inner, self, name) ->
    
    #REQUIRED: name
    introduce = undefined
    
    # public method
    self.introduce = introduce = ->
      console.log "My name is " + name + "."
)

UsingStatic = CLASS((cls) ->
  
  # private static property
  kind = "Human"
  
  # public static property
  cls.city = "Seoul"

  init: (inner, self, name) ->
    #REQUIRED: name
    
    # introduce. (public method)
    self.introduce = introduce = ->
      console.log "My name is " + name + ", live in " + cls.city
)

UsingPreset = CLASS(
  
  # basic parameters
  params: ->
    {
      # ...
    }
  
  # preset object
  preset: (params) ->
    ParentClass

  init: (inner, self, params) ->
    #REQUIRED: params

    # ...
)