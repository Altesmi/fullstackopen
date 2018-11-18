const listHelper = require("../utils/list_helper");
const helper = require('./test_helper')

describe.skip("List helper tests", () => {
  test("dummy is called", () => {
    const result = listHelper.dummy(helper.listWithNoBlogs);
    expect(result).toBe(1);
  });

  describe("total likes", () => {
    test("when no blogs 0 is returned", () => {
      const result = listHelper.totalLikes(helper.listWithNoBlogs);
      expect(result).toBe(0);
    });

    test("when dummy object is input 0 is returned", () => {
      const result = listHelper.totalLikes(helper.listWithOnlyOneDummyObject);
      expect(result).toBe(0);
    });

    test("when one blog is input output is its likes", () => {
      const result = listHelper.totalLikes(helper.listWithOneBlog);
      expect(result).toBe(helper.listWithOneBlog[0].likes);
    });

    test("when 2 blogs are input output is the sum of likes", () => {
      const result = listHelper.totalLikes(helper.listWithTwoBlogs);
      expect(result).toBe(helper.listWithTwoBlogs[0].likes + helper.listWithTwoBlogs[1].likes);
    });
  });

  describe("favorite blog", () => {
    test("when no blogs empty object is returned", () => {
      const result = listHelper.favoriteBlog(helper.listWithNoBlogs);
      expect(result).toMatchObject({});
    });

    test("when dummy object is input empty object is returned", () => {
      const result = listHelper.favoriteBlog(helper.listWithOnlyOneDummyObject);
      expect(result).toMatchObject({});
    });

    test("when 1 blog is input the same blog is returned", () => {
      const result = listHelper.favoriteBlog(helper.listWithOneBlog);
      expect(result).toMatchObject(helper.listWithOneBlog[0]);
    });

    test("when multiple blogs are input the one with most likes is returned", () => {
      const result = listHelper.favoriteBlog(helper.listWithTwoBlogs);
      expect(result).toMatchObject(helper.listWithTwoBlogs[1]);
    });
  });

  describe("most blogs", () => {
    test("when no blogs empty object is returned", () => {
      const result = listHelper.mostBlogs(helper.listWithNoBlogs);
      expect(result).toMatchObject({});
    });

    test("when dummy object is input empty object is returned", () => {
      const result = listHelper.mostBlogs(helper.listWithOnlyOneDummyObject);
      expect(result).toMatchObject({});
    });

    test("when 1 blog is input the author of the blog is returned with number of blogs", () => {
      const result = listHelper.mostBlogs(helper.listWithOneBlog);
      expect(result).toMatchObject({ author: "Henkilo 2", blogs: 1 });
    });

    test("when multiple blogs are input the name which has the highest blog count is returned together with the blog count", () => {
      const result = listHelper.mostBlogs(helper.listWithTenBlogs);
      expect(result).toMatchObject({ author: "Henkilo 3", blogs: 5 });
    });
  });

  describe("most blogs", () => {
    test("when no blogs empty object is returned", () => {
      const result = listHelper.mostLikes(helper.listWithNoBlogs);
      expect(result).toMatchObject({});
    });

    test("when dummy object is input empty object is returned", () => {
      const result = listHelper.mostLikes(helper.listWithOnlyOneDummyObject);
      expect(result).toMatchObject({});
    });

    test("when 1 blog is input the author of the blog is returned with number of blogs", () => {
      const result = listHelper.mostLikes(helper.listWithOneBlog);
      expect(result).toMatchObject({ author: "Henkilo 2", likes: 2 });
    });

    test("when multiple blogs are input the name which has the highest blog count is returned together with the blog count", () => {
      const result = listHelper.mostLikes(helper.listWithTenBlogs);
      expect(result).toMatchObject({ author: "Henkilo 3", likes: 40 });
    });
  });
});
