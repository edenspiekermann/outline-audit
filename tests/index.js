describe('Heading outline', function () {
  after(function () {
    document.querySelector('.test-suite').style.display = 'none'
  })

  it('should return no warning for a container without heading', function () {
    var o = new Outline(document.getElementById('test-1'))
    var warnings = o.audit()
    expect(warnings.length).to.be.equal(0)
  })

  it('should return no warning for a container with a single h1', function () {
    var o = new Outline(document.getElementById('test-1'))
    var warnings = o.audit()
    expect(warnings.length).to.be.equal(0)
  })

  it('should return a warning for a container with a first heading being h2', function () {
    var container = document.getElementById('test-2')
    var o = new Outline(container)
    var warnings = o.audit()
    expect(warnings.length).to.be.equal(1)
    expect(warnings[0].node).to.be.equal(container.querySelector('h2'))
  })

  it('should return a warning for a container with a first heading being h3', function () {
    var container = document.getElementById('test-3')
    var o = new Outline(container)
    var warnings = o.audit()
    expect(warnings.length).to.be.equal(1)
    expect(warnings[0].node).to.be.equal(container.querySelector('h3'))
  })

  it('should return a warning for a container with a first heading being h4', function () {
    var container = document.getElementById('test-4')
    var o = new Outline(container)
    var warnings = o.audit()
    expect(warnings.length).to.be.equal(1)
    expect(warnings[0].node).to.be.equal(container.querySelector('h4'))
  })

  it('should return a warning for a container with a first heading being h5', function () {
    var container = document.getElementById('test-5')
    var o = new Outline(container)
    var warnings = o.audit()
    expect(warnings.length).to.be.equal(1)
    expect(warnings[0].node).to.be.equal(container.querySelector('h5'))
  })

  it('should return a warning for a container with a first heading being h6', function () {
    var container = document.getElementById('test-6')
    var o = new Outline(container)
    var warnings = o.audit()
    expect(warnings.length).to.be.equal(1)
    expect(warnings[0].node).to.be.equal(container.querySelector('h6'))
  })

  it('should return no warning for a container with a logical heading outline (h1 -> h2)', function () {
    var o = new Outline(document.getElementById('test-7'))
    var warnings = o.audit()
    expect(warnings.length).to.be.equal(0)
  })

  it('should return a warning for a container with a illogical heading outline (h1 -> h3)', function () {
    var container = document.getElementById('test-8')
    var o = new Outline(container)
    var warnings = o.audit()
    expect(warnings.length).to.be.equal(1)
    expect(warnings[0].node).to.be.equal(container.querySelector('h3'))
  })

  it('should return a warning for a container with a illogical heading outline (h1 -> h4)', function () {
    var container = document.getElementById('test-9')
    var o = new Outline(container)
    var warnings = o.audit()
    expect(warnings.length).to.be.equal(1)
    expect(warnings[0].node).to.be.equal(container.querySelector('h4'))
  })

  it('should return a warning for a container with a illogical heading outline (h1 -> h5)', function () {
    var container = document.getElementById('test-10')
    var o = new Outline(container)
    var warnings = o.audit()
    expect(warnings.length).to.be.equal(1)
    expect(warnings[0].node).to.be.equal(container.querySelector('h5'))
  })

  it('should return a warning for a container with a illogical heading outline (h1 -> h6)', function () {
    var container = document.getElementById('test-11')
    var o = new Outline(container)
    var warnings = o.audit()
    expect(warnings.length).to.be.equal(1)
    expect(warnings[0].node).to.be.equal(container.querySelector('h6'))
  })

  it('should return no warning for a container with a sibling headings (h1 -> h1)', function () {
    var container = document.getElementById('test-12')
    var o = new Outline(container)
    var warnings = o.audit()
    expect(warnings.length).to.be.equal(0)
  })
})
