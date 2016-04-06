(function (global) {
  /**
   * Transform current path into real object path
   */
  function getObjectPath (path) {
    return (path.length === 0)
      ? path
      : ['children'].concat(path.join('.children.').split('.'))
  }

  /**
   * Get level from heading node
   */
  function getLevel (node) {
    return parseInt(node.tagName.slice(1), 10)
  }

  /**
   * Poor man’s _.get(..)
   */
  function get (object, path) {
    return path.reduce(function (prev, curr) {
      return prev[curr]
    }, object)
  }

  function auditOutline (outline) {
    var warnings = []

    outline.children.forEach(function (heading) {
      heading.level > outline.level + 1 && warnings.push({
        message: '〰 Heading “' + heading.text + '” is level ' + heading.level + ' but previous heading was level ' + outline.level + ' (“' + outline.text + '”).',
        node: heading.node
      })

      warnings = warnings.concat(auditOutline(heading))
    })

    return warnings
  }

  var Outline = function (node) {
    this.node = node || document
    this.outline = this.parse()
    this.warnings = this.audit()
  }

  Outline.prototype.parse = function () {
    var outline = { children: [] }
    var headings = this.node.querySelectorAll('h1, h2, h3, h4, h5, h6')
    var lastLevel = 0
    var currentPath = []

    Array.prototype.forEach.call(headings, function (heading) {
      var level = getLevel(heading)
      var data = {
        text: heading.textContent || heading.innerText,
        level: level,
        node: heading,
        children: []
      }

      if (level < lastLevel) {
        for (var i = lastLevel; i >= level; i--) currentPath.pop()
      } else if (level === lastLevel) {
        currentPath.pop()
      }

      var prop = get(outline, getObjectPath(currentPath))
      prop.children.push(data)
      currentPath.push(prop.children.length - 1)
      lastLevel = level
    })

    return outline
  }


  Outline.prototype.warn = function () {
    var end = ''

    if (this.warnings.length === 0) {
      end = '💯 ' + 'Outline audit over. 0 warnings found. Congratulations!'
    } else if (this.warnings.length === 1) {
      end = '❗️ ' + 'Outline audit over. 1 warning found. Not bad!'
    } else {
      end = '💢 ' + 'Outline audit over. ' + this.warnings.length + ' warnings found. Uh-oh!'
    }

    console.log('Auditing heading outline in:')
    console.log(this.node)
    console.log('')

    this.warnings.forEach(function (warning) {
      console.log(warning.message)
      console.log(warning.node)
    })

    console.log('')
    console.log(end)
  }

  Outline.prototype.audit = function () {
    var warnings = []

    this.outline.children.forEach(function (heading) {
      heading.level !== 1 && warnings.push({
        message: '〰 Heading “' + heading.text + '” is level ' + heading.level + ' but it comes at root of document.',
        node: heading.node
      })

      warnings = warnings.concat(auditOutline(heading))
    })

    return warnings
  }

  global.Outline = Outline
}(window))
