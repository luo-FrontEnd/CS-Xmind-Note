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