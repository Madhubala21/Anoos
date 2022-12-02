import { adminDbController } from "../../core/database/Controller/adminDbController.js";
import { userDbController } from "../../core/database/Controller/userDbController.js";
import * as Error from "../../core/errors/ErrorConstant.js";
import { isDataValid, isUpdated } from "../../core/utils/functions.js";
// import { PayloadCompiler } from "../access/PayloadCompiler.js";

export class productMiddleware {}

//category
productMiddleware.Category = {
  fetchCategory: async ({ query }) => {
    const fetched = await adminDbController.Category.getCategory(query);
    if (
      fetched != null &&
      fetched != undefined &&
      Object.keys(fetched).length != 0
    ) {
      return fetched;
    } else {
      return "No Categories Found";
    }
  },
  createCategory: async ({ body, image }) => {
    body.categoryImage = image;
    const existingCategory =
      await adminDbController.Category.checkCategoryExists(body);
    if (
      existingCategory != null &&
      existingCategory != undefined &&
      Object.keys(existingCategory).length != 0
    ) {
      return "Category Already Exists";
    } else {
      const created = await adminDbController.Category.createCategory(body);
      if (
        created != null &&
        created != undefined &&
        Object.keys(created) != 0
      ) {
        return "Category Created Successfully";
      } else {
        throw Error.SomethingWentWrong("Failed to Create Category");
      }
    }
  },
  putCategory: async ({ body, image }) => {
    if (body.status != null && body.status != undefined) {
      const checkproduct =
        await adminDbController.Category.checkProductExistsInCategory(body);
      if (
        checkproduct != null &&
        checkproduct != undefined &&
        Object.keys(checkproduct).length != 0
      ) {
        const inactivateProducts =
          await adminDbController.Product.inactivateProducts(body);
        const updated = await adminDbController.Category.destroyCategory(body);
        if (updated[0] != 0 && inactivateProducts[0] != 0) {
          return "Update Success";
        } else {
          return "Update Failed";
        }
      } else {
        const updated = await adminDbController.Category.destroyCategory(body);
        if (updated[0] != 0) {
          return "Update Success";
        } else {
          return "Update Failed";
        }
      }
    } else {
      const categoryExists = await adminDbController.Category.getCategory(body);
      if (
        categoryExists != null &&
        categoryExists != undefined &&
        Object.keys(categoryExists).length != 0
      ) {
        body.categoryImage = image || categoryExists.categoryImage;
        const updated = await adminDbController.Category.putCategory(body);
        if (updated[0] != 0) {
          return "Update Success";
        } else {
          return "Update Failed";
        }
      }
    }
  },
};

//products
productMiddleware.Product = {
  fetchProduct: async ({ params }) => {
    const fetched = await adminDbController.Product.getAllProducts(params);
    if (
      fetched != null &&
      fetched != undefined &&
      Object.keys(fetched).length != 0
    ) {
      return fetched;
    } else {
      return "No Products Found";
    }
  },
  createProduct: async ({ body, image }) => {
    if (image != null) {
      body.image = image;
    }
    // return await DBController.Admin.Product.createproduct(body);
    const existingProduct = await adminDbController.Product.checkProductExists(
      body
    );

    if (
      existingProduct != null &&
      existingProduct != undefined &&
      Object.keys(existingProduct).length != 0
    ) {
      throw Error.SomethingWentWrong(
        existingProduct.productName + " Already Exists"
      );
      // return existingProduct.productName + " Already Exists"
    } else {
      var tag = JSON.stringify(body.tags);
      body.tags = tag;
      const created = await adminDbController.Product.createProduct(body);
      if (
        created != null &&
        created != undefined &&
        Object.keys(created).length != 0
      ) {
        body.productId = created.id;
        // body.productSpecification = JSON.stringify(body.productSpecification);
        const fetched =
          await adminDbController.Specifications.createProductSpecs(body);
        if (
          fetched != null &&
          fetched != undefined &&
          Object.keys(fetched).length != 0
        ) {
          // return fetched;
          return "Product Created";
        }
      } else {
        return "Unable to Create Product";
      }
    }
  },
  putProduct: async ({ body, image }) => {
    const foundProduct = await adminDbController.Product.findProductById(
      body.productId
    );
    body.productImage = image || foundProduct?.productImage;
    // body.status = body.status?.trim() || foundProduct.status
    if (
      foundProduct == null ||
      foundProduct == undefined ||
      Object.keys(foundProduct).length == 0
    ) {
      return "Product not exists";
    }
    body.tags = JSON.stringify(body.tags);
    // if (body.status === "inactive") {
    //     const checkproduct = await adminDbController.Product.checkVariantExistsInProduct(body);
    //     if (checkproduct != null && checkproduct != undefined && Object.keys(checkproduct).length != 0) {
    //         return "Product Variant Exists in " + checkproduct.productName;
    //     } else {
    //         const updated = await adminDbController.Product.putProduct(body);
    //         if (updated[0] != 0) {
    //                 return "Update Success"
    //         } else {
    //             return "Update Failed"
    //         }
    //     }
    // } else {
    const updated = await adminDbController.Product.putProduct(body);
    if (updated[0] != 0) {
      const updateProductSpecification =
        await adminDbController.Specifications.updateSpecification(body);
      if (updateProductSpecification[0] != 0) {
        return "Update Success";
      }
    } else {
      return "Update Failed";
    }
    // }
  },
  removeProduct: async ({ body }) => {
    const updated = await adminDbController.Product.destroyProduct(body);
    if (isUpdated(updated)) {
      return "Product Updated";
    }
  },

  //Recommended Products

  addRecommend: async ({ body }) => {
    const addRecommended = await adminDbController.Product.addRecommended(body);
    if (
      addRecommended != null &&
      addRecommended != undefined &&
      Object.keys(addRecommended).length != 0
    ) {
      return "Product Added to Recommended";
    } else {
      throw Error.SomethingWentWrong("Failed to Add Recommended Product");
    }
  },
  getRecommended: async () => {
    const getRecommended = await adminDbController.Product.getAllRecommended();
    var productIds = [];
    for (let index = 0; index < getRecommended.length; index++) {
      productIds.push(getRecommended[index].productId);
    }
    const fetchProductArray = await adminDbController.Product.fetchProductArray(
      productIds
    );
    if (
      fetchProductArray != null &&
      fetchProductArray != undefined &&
      Object.keys(fetchProductArray).length != 0
    ) {
      return fetchProductArray;
    } else {
      throw Error.SomethingWentWrong("No Recommended Products Found");
    }
  },
  removeRecommend: async ({ body }) => {
    const destroyed = await adminDbController.Product.deleteRecommended(body);
    if (destroyed != null && destroyed != undefined && destroyed[0] != 0) {
      return "Product Removed from Recommended";
    } else {
      throw Error.SomethingWentWrong("Unable to Delete Recommended Product");
    }
  },
};

//prodct variants
productMiddleware.Variant = {
  fetchVariant: async ({ body }) => {
    const fetched = await adminDbController.Variant.fetchVariants(body);
    if (isDataValid(fetched)) {
      return fetched;
    } else {
      return "No Variants Found";
    }
  },
  createVariant: async ({ body }) => {
    console.log(body);
    body.variantImage = JSON.stringify(body.variantImage);
    body.tags = JSON.stringify(body.tags);
    body.variantColor = JSON.stringify(body.variantColor);
    body.actualPrice = JSON.stringify(body.actualPrice);
    body.discountPrice = JSON.stringify(body.discountPrice);

    if (body.variantColor.length != 0) {
      body.isColor = true;
    }

    const existingVariant = await adminDbController.Variant.checkVariantExists(
      body
    );
    if (
      existingVariant != null &&
      existingVariant != undefined &&
      Object.keys(existingVariant).length != 0
    ) {
      throw Error.AlreadyExists("Product");
    } else {
      const created = await adminDbController.Variant.createVariant(body);
      if (
        created != null &&
        created != undefined &&
        Object.keys(created).length != 0
      ) {
        return "Product Variant Created";
      } else {
        return "Unable to Create Product Variant";
      }
    }
  },
  putVariant: async ({ body }) => {
    if (
      body.status != null &&
      body.status != undefined &&
      Object.keys(body.status).length != 0
    ) {
      const destroyed = await adminDbController.Variant.destroyVariant(body);
      if (destroyed[0] != 0) {
        return "Update Success";
      }
    } else {
      const existingVariant =
        await adminDbController.Variant.checkVariantIdExists(body);

      if (
        existingVariant != null &&
        existingVariant != undefined &&
        Object.keys(existingVariant).length != 0
      ) {
        if (
          body.variantImage.length == 0 ||
          body.variantImage == null ||
          body.variantImage == undefined
        ) {
          body.variantImage = existingVariant.variantImage;
        } else {
          body.variantImage = JSON.stringify(body.variantImage);
        }
        body.variantColor = JSON.stringify(body.variantColor);
        body.actualPrice = JSON.stringify(body.actualPrice);
        body.discountPrice = JSON.stringify(body.discountPrice);
        body.tags = JSON.stringify(body.tags);

        if (body.variantColor.length != 0) {
          body.isColor = true;
        }

        const updated = await adminDbController.Variant.putVariant(body);
        if (updated[0] != 0) {
          return "Update Success";
        } else {
          return "Update Failed";
        }
      } else {
        return "Product Variant Not Exists";
      }
    }
  },
};

//stock Management
productMiddleware.Stock = {
  fetchStock: async ({ body }) => {
    const fetched = await adminDbController.Variant.Stock.fetchStock(body);
    if (
      fetched != null &&
      fetched != undefined &&
      Object.keys(fetched).length != 0
    ) {
      return fetched;
    } else {
      return "No Stock Found";
    }
  },

  //fetch old and update
  putStock: async ({ body }) => {
    body.availableStock = JSON.stringify(body.availableStock);
    body.alternateStock = JSON.stringify(body.alternateStock);
    const updated = await adminDbController.Variant.Stock.putStock(body);
    if (updated[0] != 0) {
      return "Update Success";
    } else {
      return "Update Failed";
    }
  },
};

//Product Blog
productMiddleware.Blog = {
  fetchBlog: async ({ body }) => {
    const fetched = await adminDbController.Blog.getBlog(body);
    if (
      fetched != null &&
      fetched != undefined &&
      Object.keys(fetched).length != 0
    ) {
      return fetched;
    } else {
      return "No Details Found";
    }
  },
  createBlog: async ({ body, image }) => {
    var checkBlogLimit = await adminDbController.Blog.checkBlogLimit(body);
    if (
      checkBlogLimit?.blogLimit <= 3 &&
      checkBlogLimit !== null &&
      checkBlogLimit != undefined
    ) {
      body.sectionImage = image;
      const created = await adminDbController.Blog.createBlog(body);
      if (
        created != null &&
        created != undefined &&
        Object.keys(created).length != 0
      ) {
        var blogLimit = Number(checkBlogLimit.blogLimit) + 1;
        const body = {
          blogLimit: blogLimit,
          productId: checkBlogLimit.id,
        };
        const updated = await adminDbController.Blog.updateBlog(body);
        if (updated[0] != 0) {
          return "Blog Created";
        }
      } else {
        return "Blog Creation Failed";
      }
    } else if (checkBlogLimit?.blogLimit >= 3) {
      return "Maximium Limit Reached";
    } else {
      return "No Product Exists";
    }
  },
  putBlog: async ({ body }) => {
    const updated = await adminDbController.Blog.putBlog(body);
    if (updated[0] != 0) {
      return "Delete Success";
    } else {
      return "Delete Failed";
    }
  },
};

//Product Specifications
productMiddleware.Specifications = {
  fetchTitles: async ({ body }) => {
    const fetched = await adminDbController.Specifications.getProductTitles(
      body
    );
    if (
      fetched != null &&
      fetched != undefined &&
      Object.keys(fetched).length != 0
    ) {
      return fetched;
    } else {
      return "No Details Found";
    }
  },
  createTitle: async ({ body }) => {
    body.productTitle = JSON.stringify(body.productTitle);
    const productSpecsExists =
      await adminDbController.Specifications.checkTitleExists(body);
    if (
      productSpecsExists != null &&
      productSpecsExists != undefined &&
      productSpecsExists.length != 0
    ) {
      const updated = await adminDbController.Specifications.updateProductTitle(
        body
      );
      if (updated[0] != 0) {
        return "Specifications Created Successfully";
      } else {
        throw Error.SomethingWentWrong("Unable to Add Title..!");
      }
    } else {
      const fetched = await adminDbController.Specifications.createProductTitle(
        body
      );
      if (
        fetched != null &&
        fetched != undefined &&
        Object.keys(fetched).length != 0
      ) {
        return "Created Successfully";
      } else {
        throw Error.SomethingWentWrong("Unable to Add Title..!");
      }
    }
  },
  removeTitle: async ({ body }) => {
    const fetchSpecifications = await userDbController.Shop.fetchProductSpecs(
      body
    );
    if (
      fetchSpecifications.length != 0 &&
      fetchSpecifications != undefined &&
      fetchSpecifications != null
    ) {
      throw Error.SomethingWentWrong(
        "Unable to Delete..! A Product Specification Exists"
      );
    } else {
      const updated = await adminDbController.Specifications.deleteTitle(body);
      if (updated[0] != 0) {
        return "Delete Success";
      } else {
        return "Delete Failed";
      }
    }
  },

  //specifications

  fetchSpecifications: async ({ body }) => {
    const fetched = await userDbController.Shop.fetchProductSpecs(body);
    console.log(fetched);
    if (
      fetched != null &&
      fetched != undefined &&
      Object.keys(fetched).length != 0
    ) {
      return fetched;
    } else {
      return "No Details Found";
    }
  },
  // createSpecification: async ({ body }) => {
  //     console.log(body);
  //     const productSpecsExists = await adminDbController.Specifications.checkSpecExists(body);
  //     if (productSpecsExists != null && productSpecsExists != undefined && productSpecsExists.length != 0) {
  //         throw Error.SomethingWentWrong("Product Specification Already Exists");
  //     } else {
  //         const fetched = await adminDbController.Specifications.createProductSpecs(body)
  //         if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
  //             return fetched;
  //         } else {
  //             return "No Details Found"
  //         }
  //     }
  // },
  removeSpecification: async ({ body }) => {
    const updated = await adminDbController.Specifications.deleteSpecification(
      body
    );
    if (updated[0] != 0) {
      return "Delete Success";
    } else {
      return "Delete Failed";
    }
  },
};
