import { handleError } from "../error.js";
import User from "../models/User.js";
import Tweet from "../models/tweet.js";

//Get User
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//Update user
export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(handleError(403, "You can only update your own account"));
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      await Tweet.removeAllListeners({ userId: req.params.id });
      res.status(200).json("User is deleted");
    } catch (error) {
      next(error);
    }
  } else {
    return next(handleError(403, "No User with this id"));
  }
};

//Follow user
export const follow = async (req, res, next) => {
  try {
    //user to follow
    const userToFollow = await User.findById(req.params.id);
    //current user
    const currentUser = await User.findById(req.body.id);

    if (!userToFollow.followers.includes(req.body.id)) {
      await userToFollow.updateOne({
        $push: { followers: req.body.id },
      });

      await currentUser.updateOne({
        $push: { following: req.params.id },
      });
    } else {
      res.status(403).json("Already following");
    }
    res.status(200).json("Following the user");
  } catch (error) {
    next(error);
  }
};

//UnFollow user
export const unfollow = async (req, res, next) => {
  try {
    //user to unfollow
    const userToUnFollow = await User.findById(req.params.id);
    //current user
    const currentUser = await User.findById(req.body.id);

    if (currentUser.following.includes(req.params.id)) {
      await userToUnFollow.updateOne({
        $pull: { followers: req.body.id },
      });

      await currentUser.updateOne({
        $pull: { following: req.params.id },
      });
    } else {
      res.status(403).json("Already not following");
    }
    res.status(200).json("Unfollwed the user");
  } catch (error) {
    next(error);
  }
};
