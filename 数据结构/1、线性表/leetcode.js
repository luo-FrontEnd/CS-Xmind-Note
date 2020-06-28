//二维数组中的查找--二维数组                                     
    /*
        在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
        来源：力扣（LeetCode）
        链接：https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof
        著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
    */

    //第一种方法，直接双重遍历,时间复杂度O(n*m)
    var findNumberIn2DArray = function(matrix, target) {
        let n = matrix.length;
        let m = matrix[0].length;
        for (let i = 0; i < n; i++) {
            if (target === matrix[i][0] || target === matrix[i][m - 1])   //如果等于开头和结尾直接返回
                return true;
            if (target > matrix[i][0] && target < matrix[i][m - 1]) {     //根据数组有序=》target需要大于开头并且小于结尾才会在这个数组里
                for (let j = 1; j < m - 1; j++) {
                    if (target === matrix[i][j])
                        return true;
                }
            }
        }
        return false;
    }

    //第二种方法 单层循环，时间复杂度O(n+m)
    var findNumberIn2DArray2 = function(matrix, target) {
        let n = matrix.length; 
        if (!n) 
            return false; 
        let m = matrix[0].length;
        if (!m) 
            return false;

        let row = 0;
        let column = m - 1;
        while(row < n && column >= 0) {     //重点
            if (matrix[row][column] === target) {
                return true;
            } else if (matrix[row][column] > target) {
                column--;
            } else {
                row++;
            }
        }
        return false;
    }

//旋转矩阵--二维数组
    /*
        给你一幅由 N × N 矩阵表示的图像，其中每个像素的大小为 4 字节。请你设计一种算法，将图像旋转 90 度。
        不占用额外内存空间能否做到？
            给定 matrix = 
            [
            [1,2,3],
            [4,5,6],
            [7,8,9]
            ],

            原地旋转输入矩阵，使其变为:
            [
            [7,4,1],
            [8,5,2],
            [9,6,3]
            ]

            来源：力扣（LeetCode）
            链接：https://leetcode-cn.com/problems/rotate-matrix-lcci
            著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
    */
    var rotate = function(matrix) {

    }


//删除排序数组中的重复项
    /*
        给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

        不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

        给定数组 nums = [1,1,2], 

        函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。

        来源：力扣（LeetCode）
        链接：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array
        著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
    */

    //快慢指针
    //i慢指针，j快指针，
    var removeDuplicates = function(nums) {
        if (nums.length < 2) return nums.length;
        let len = nums.length;
        let i = 0;
        for( let j = 1; j < len; j++) {
            if (nums[i] != nums[j]) {
                i++;
                nums[i] = nums[j];
            }
        }
        return i + 1;
    }

    //第二种方法--利用删除数组指定元素
    var removeDuplicates = function(nums) {
        if (nums.length < 2) return nums.length;
        let i = 0;
        for (let j = 1; j < nums.length; j++) {
            if (nums[i] == nums[j]) {
                nums.splice(j,1);
                j--;
            } else {
                i++;
            }
        }
        return i + 1;
    };


//旋转数组
    /*
        给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

        示例 1:

        输入: [1,2,3,4,5,6,7] 和 k = 3
        输出: [5,6,7,1,2,3,4]
        解释:
        向右旋转 1 步: [7,1,2,3,4,5,6]
        向右旋转 2 步: [6,7,1,2,3,4,5]
        向右旋转 3 步: [5,6,7,1,2,3,4]

        来源：力扣（LeetCode）
        链接：https://leetcode-cn.com/problems/rotate-array
        著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
    */

    //说明：这题有许多解法

    //第一种：暴力破解
    //时间复杂度O(n*k):n为数组长度，k为移动的位置。
    var rotate = function(nums, k) {
        let len = nums.length;
        let last, temp;
        for(let i = 0; i < k; i++) {
            last = nums[len - 1];
            for(let j = 0; j < len; j++) {
                temp = nums[j];
                nums[j] = last;
                last = temp;
            }
        }
    }

    //第二种：三次旋转
    //第一次将数组旋转；第二次将前k项旋转；第三次将k+1到len项旋转
    //时间复杂度O(n):n为数组长度。
    var rotate2 = function(nums, k) {
        let len = nums.length;
        k %= len;
        reversal(nums, 0, len - 1);
        reversal(nums, 0, k - 1);
        reversal(nums, k, len -1);
    }

    function reversal(nums, startIndex, endIndex) {
        while(startIndex < endIndex) {
            let temp = nums[endIndex];
            nums[endIndex] = nums[startIndex];
            nums[startIndex] = temp;
            startIndex++;
            endIndex--;
        }
    }


//反转链表

    /*
        反转一个单链表

        示例:

        输入: 1->2->3->4->5->NULL
        输出: 5->4->3->2->1->NULL
        进阶:
        你可以迭代或递归地反转链表。你能否用两种方法解决这道题？

        来源：力扣（LeetCode）
        链接：https://leetcode-cn.com/problems/reverse-linked-list
        著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
    */

    //迭代
    var reverseList = function(head) {
        let prev = null;
        let curr = head;

        while(curr != null) {
            let tempNext = curr.next         //将指向下一个结点的指针存起来
            curr.next = prev;                //将prev赋值给当前结点的next指针
            prev = curr;                     //将prev结点进1；
            curr = tempNext;                 //将当前结点进1；
        }
                                             //换完结果是curr->null, prev->5
                                             // null -> 5 -> 4 -> 3 -> 2 -> 1 -> null;
                                             //返回head为prev.
        return prev;
    }