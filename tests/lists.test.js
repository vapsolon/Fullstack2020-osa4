const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

test('listHelper returns correct', () => {
    const blogs = [
    {
        title: "Test Blog",
        author: "Test Author",
        url: "test.blog",
        likes: 2
    },
    {
        title: "Testi Blogi",
        author: "Testi Authori",
        url: "testi.blogi",
        likes: 4
    }
    ]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(6)
})

test("Empty listHelper returns 0", () =>{
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
})

test("Non-list listHelper returns 0", () =>{
    const blogs = 1

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
})