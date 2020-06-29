//1、数组中的第K个最大值

    /*
        在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

        示例 1:

        输入: [3,2,1,5,6,4] 和 k = 2
        输出: 5
        示例 2:

        输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
        输出: 4
        说明:

        你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。

        来源：力扣（LeetCode）
        链接：https://leetcode-cn.com/problems/kth-largest-element-in-an-array
        著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
    */

    //第一种解法：暴力破解,改编一下冒泡，插入，选择这三种基础稳定的排序，排到第k - 1项就好了，所以时间复杂度为O(n * k)
    var findKthLargest = function(nums, k) {
        //改编冒泡算法--故意这样写的，平常写的时候可以直接正序，然后取nums[nums.length - k].
        let len = nums.length;
        for(let i = len - 1; i >= len - k; i--) {
            for(let j = len - 1; j >= len - i - 1; j--) {
                if(nums[j] > nums[j - 1]) {
                    let temp = nums[j];
                    nums[j] = nums[j - 1];
                    nums[j - 1] = temp;
                }
            }
        }
        return nums[k - 1];
    }