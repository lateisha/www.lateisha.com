$(window).load(() ->
  $('.escher').each(() ->
    that = this
    smallPadding = 26 / 2
    borderSize = 4
    create = () ->
      $(that).find('.escher-leftdown').remove()
      $(that).find('.escher-leftup').remove()
      $(that).find('.escher-rightdown').remove()
      $(that).find('.escher-rightup').remove()

      main = $(that).find('.escher-content')
      width = $(main).innerWidth()
      height = $(main).innerHeight()
      padding = parseInt($(main).css('padding-top'))
      parentWidth = $(that).parent().innerWidth()
      position = $(main).position()

      if $(that).attr('data-leftdown')
        leftDownStyles =
          border: "#{borderSize}px solid #fff"
          height: height + smallPadding + (borderSize * 2)
          width: width + smallPadding + (borderSize * 2)
          position: 'absolute'
          left: ((parentWidth - width) / 2) - borderSize - smallPadding
          top: position.top - borderSize
          'z-index': 100
        $(that).prepend('<div class="escher-leftdown"></div>')
          
        $(that).find('.escher-leftdown').css(leftDownStyles)

      if $(that).attr('data-leftup')
        leftUpStyles =
          border: "#{borderSize}px solid #fff"
          height: height + smallPadding + (borderSize * 2)
          width: width + smallPadding + (borderSize * 2)
          position: 'absolute'
          left: ((parentWidth - width) / 2) - borderSize - smallPadding
          top: position.top - smallPadding - borderSize
          'z-index': 100
        $(that).prepend('<div class="escher-leftup"></div>')
          
        $(that).find('.escher-leftup').css(leftUpStyles)

      if $(that).attr('data-rightdown')
        rightDownStyles =
          border: "#{borderSize}px solid #fff"
          height: height + smallPadding + (borderSize * 2)
          width: width + smallPadding + (borderSize * 2)
          position: 'absolute'
          left: ((parentWidth - width) / 2) - borderSize
          top: position.top - borderSize
          'z-index': 100

        $(that).prepend('<div class="escher-rightdown"></div>')
        $(that).find('.escher-rightdown').css(rightDownStyles)

      if $(that).attr('data-rightup')
        rightUpStyles =
          border: "#{borderSize}px solid #fff"
          height: height + smallPadding + (borderSize * 2)
          width: width + smallPadding + (borderSize * 2)
          position: 'absolute'
          left: ((parentWidth - width) / 2) - borderSize
          top: position.top - smallPadding - borderSize
          'z-index': 100

        $(that).prepend('<div class="escher-rightup"></div>')
        $(that).find('.escher-rightup').css(rightUpStyles)

    create()

    $(window).resize(create)
  )

  $('.flip').each(() ->
    carousel = $(this).find('.carousel')
    $(carousel).carousel({ interval: false })
    $(this).find('.flip-control-left').on('click', () ->
      $(carousel).carousel('prev')
    )
    $(this).find('.flip-control-right').on('click', () ->
      $(carousel).carousel('next')
    )
  )
)
