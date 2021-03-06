## 串
#### 1、串的定义和实现
######  1.1、串的定义
    
    串（string）:是由零个或多个字符组成的有限序列。
    
    子串:串中任意个连续的字符组成的子序列。
    
    主串:包含子串的串。
    
    子串在主串中的位置以子串的第一个字符在主串中的位置表示。
    
    当两个串的长度相等且每个对应为止的字符都相等时，称这两个串是相等的。
    
    空格串:由一个或多个空格（空格是特殊字符）组成的串。
    
    
######  1.2、串的存储结构
    
    1.2.1、定长顺序存储表示
        
        类似于线性表的顺序存储结构，用一组地址连续的存储单元存储串值的字符序列。
        
        #define MAXLEN 255  //预定义最大串长为255
        typedef struct {
            char ch[MAXLEN];   //每个分量存储一个字符
            int length;        //串的实际长度
        }SString;
        
        
    1.2.2、堆分配存储表示
    
        堆分配存储表示仍然以一组地址连续的存储单元存放串值的字符序列，但它们的存储空间是在程序执行过程中动态分配得到的。
        
        typedef struct {
            char *ch;       //按串长分配存储区，ch指向串的基地址
            int length;     //串的实际长度。
        }HString;
        
        
    1.2.3、串的基本操作
    
        1) StrAssign(&T, chars):            赋值操作。把串T赋值为chars
        2) StrCopy(&T, S):                  赋值操作，由串S赋值得到串T
        3) StrEmpty(S):                     判空操作
        4) StrCompare(S, T):                比较操作
        5) StrLength(S);                    求串长 
        6) SubString(&Sub, S, pos, len):    求子串，用Sub返回串S的第pos个字符起长度为len的子串
        7) Concat(&T, S1, S2):              串连接，用T返回由S1和S2连接而成的新串
        8) Index(S, T):                     定位操作，若主串S中存在与串T值相同的子串，则返回它在主串中第一次出现的为止，否则返回函数值为0（有些语言返回-1）
        9) ClearString(&S):                 清空操作
        10) DestroyString(&S):              销毁操作
        
    
#### 2、串的模式匹配

    子串的定位操作称为串的模式匹配。
    它求的是子串（常称模式串）在主串中的位置。
    
######  2.1、简单的模式匹配算法
    
    暴力匹配算法：
        
        int Index(SString S, SString T) {
            int i = 1, j = 1;
            while(i <= S.length && j <= T.length) {
                if (S.ch[i] == T.ch[j]) {
                     ++i; ++j;                          //继续比较后继字符
                } else {
                     i = i - j + 2; j = 1;              //指针后退重新开始匹配
                }
                if (j > T.length) return i - T.length;
                else return 0;
            }
        }
    
######  2.2、改进的模式匹配算法--KMP算法
    
    2.2.1、字符串的前缀、后缀和部分匹配值
    2.2.2、KMP算法的原理
    
######  2.3、KMP算法的进一步优化