## 栈和队列的基本概念

#### 1、栈
###### 1.1、栈的基本概念
    1.1.1、栈的基本概念：   
    
        栈（stack）:是限定仅在表尾进行插入和删除操作的线å性表。
        
        栈顶（top）:线性表允许进行插入删除的那一端。
        
        栈底（bottom）:固定的，不允许进行插入删除的另一端。
        
        空栈：不含任何元素的空表。
        
        进栈（压栈、入栈）：栈的插入操作。
        
        出栈（弹栈）：栈的删除操作。
        
        栈是一种先进后出的线性表。(First In Last Out, FILO)
        
    1.1.2、栈的基本操作：
        
        InitStack(&S):初始化一个空栈；
        StackEmpty(S):判断一个栈是否为空，若栈S为空则返回true，否则返回false。
        Push(&S, x):进栈，若栈S未满，则将x加入使之称为新的栈顶。
        Pop(&S, &x):出栈，若栈S非空，则弹出栈顶元素，并用x返回。
        GetTop(S, &x):读取栈顶元素，若栈S非空，则用x返回栈顶元素。
        DestoryStack(&S):销毁栈，并释放栈S占用的存储空间("&"表示引用调用)。
    
###### 1.2、栈的顺序存储结构--顺序栈
    1.2.1、顺序栈的基本概念
    
        顺序栈：采用顺序存储的栈。它利用一组地址连续的存储单元存放自栈底到栈顶的数据元素。同时附设一个指针（top）指示当前栈顶元素的位置。
        
        #define MaxSize 50          //定义栈中元素的最大个数
        typedef struct {
            ElemType data[MaxSize]; //存放栈中元素
            int top;                //栈顶指针
        }SqStack;
        
        栈顶指针:S.top,初始化设置S.top = -1
        栈顶元素:S.data[S.top]
        进栈操作:栈不满时，栈顶指针先+1，再送值到栈顶元素。
        出栈操作:栈非空时，先取栈顶元素值，再将栈顶指针-1。
        栈空条件:S.top == -1
        栈满条件:S.top == MaxSize - 1
        栈长: S.top+1
    
    1.2.2、顺序栈的基本运算
    
        (1)初始化
            viod InitStack(SqStack &S) {
                S.top = -1;
            }
        (2)判栈空
            bool StackEmpty(SqStack S) {
                if (S.top == -1) {
                    return true;
                } else {
                    return false;
                }
            }
        (3)进栈
            bool Push(SqStack &S, ElemType x) {
                if (S.top == MaxSize-1) {
                    return false;
                }
                S.data[++S.top] = x;  //指针先+1，再入栈
                return true;
            }
            当栈不满时，top先+1，再入栈。
        (4)出栈
            bool Pop(SqStack &S, ElemType &x) {
                if (S.top == -1) {
                    return false;
                }
                x=S.data[S.top --];     //先出栈，指针再减1
                return true;
            }
        (5)读栈顶元素
            bool GetTop(SqStack S, ElemType &x) {
                if (S.top == -1) {
                    return false;
                }
                x = S.data[S.top];
                return true;
            }
            仅为读取栈顶元素，并没有出栈操作，原栈顶元素依然保留在栈中。
    
    1.2.3、共享栈
        
        利用栈底位置相对不变的特性，可以让顺序栈共享一个一维数组空间，将两个栈的栈底分别设置在共享空间的两端，两个栈顶向共享空间的中间延伸。
        
        typedef struct {
            ElemType data[MaxSize];
            int top0;   //栈1指针
            int top1;   //栈2指针
        }
        
        两个栈的栈顶指针都指向栈顶元素，top0 = -1时，0号栈为空，top1 = MaxSize时，1号栈为空。
        仅当两个栈顶指针相邻（top1 - top0 = 1）时，栈满。
        当0号栈进栈时，top0先+1再赋值。
        当1号栈进栈时，top1先-1再赋值。
        出栈时相反就好了。   
###### 1.3、栈的链式存储结构--链栈
    
    1.3.1、链栈的基本概念
    
        链栈：采用链式存储的栈。
        
        链栈的优点：
            便于多个栈共享存储空间和提高其效率，且不存在栈满上溢的情况。
            
        通常会把栈顶放在链表的头部，所以一般不需要设置头结点。
        对于链栈来说，基本上不存在栈满的情况，除非内存已经没有可以使用的空间。
        对于空栈来说，链表原定义是指针指向空，链栈就是top = NULL
        
        typedef struct StackNode {
            ElemType data;
            struct StackNode *next;
        }StackNode, *LinkStackPtr
        
        typedef struct LinkStack {
            LinkStackPtr top;
            int count;
        }LinkStack
    
    1.3.2、链栈的基本操作
        
        (1)进栈操作
        
            bool Push(LinkStack &S, ElemType e) {
                LinkStackPtr s = (LinkStackPtr)malloc(sizeof(StackNode));  //新建一个LinkStackPtr结点
                s -> data = e;
                s -> next = S -> top;  //将当前的栈顶元素赋值给新结点的直接后继
                S -> top = s;  //将新的结点s赋值给栈顶指针
                s -> count++;
                return true;
            }
        
        (2)出栈操作
            
            bool Pop(LinkStack &S, ElemType &e) {
                LinkStackPtr p;
                if (StackEmpty(*S))
                    return false;
                e = S -> top -> data;           //栈顶的数据域赋值给e
                p = S -> top;                   //将栈顶结点赋值给p
                S -> top = S -> top -> next;    //使得栈顶指针下移一位，指向后一结点
                free(p);                        //释放结点p
                S -> count--;
                return true;
            }
    
#### 2、队列
###### 2.1、队列的基本概念
    
    2.1.1、队列的基本概念
        
        队列(Queue):是只允许在一端进行插入操作，而在另一端进行删除操作的线性表。
        
        队头(Front):允许删除的一端，又称队首。
        
        队尾(Rear):允许插入的一端
        
        空队列:不含任何元素的空表。
        
    2.2.2、队列的常见操作
    
        InitQueue(&Q):初始化队列，构造一个空队列Q。
        QueueEmpty(Q):判队列空，若队列Q为空返回true,否则返回false。
        EnQueue(&Q, x):入队，若队列Q未满，将x加入，使之成为新的队尾。
        DeQueue(&Q, &x):出队，若队列Q非空，删除队头元素，并用x返回。
        GetHead(Q, &x):读取队头元素，若队列Q非空，则将队头元素赋值给x。
        
    注意：因为栈和队列是操作受限的线性表，因此不是任何对线性表的操作都可以作为栈和队列的操作。比如，不能随便读取栈或队列中间的某个数据。
        
###### 2.2、队列的顺序存储

    2.2.1、队列的顺序存储
    
        队列的顺序实现是指:分配一块连续的存储单元存放队列中的元素，并附设两个指针：队头指针front指向队头元素，队尾指针rear指向队尾元素的下一位置。
        
        #define MaxSize 50
        typedef struct {
            ElemType data[MaxSize];
            int front, rear;
        }SqQueue;
        
        初始状态(队空条件): Q.front == Q.rear == 0
        进队操作:队不满时，先送值到队尾元素，再将队尾指针+1
        出队操作:队不为空时，先取队头元素值，再将队头指针+1
        
    2.2.2、循环队列
        
        循环队列：把存储队列元素的表从逻辑上视为一个环。
        当队首指针Q.front=MaxSize-1后，再前进一个位置就自动到0，这可以利用除法的取余运算%来实现。
        
        初始化时:Q.front = Q.rear = 0;
        队首指针进1:Q.front = (Q.front + 1)%MaxSize
        队尾指针进1:Q.rear = (Q.rear + 1)%MaxSize
        队列长度:(Q.rear + MaxSize - Q.front)%MaxSize
        
        区分队空还是队满的情况：
            1）牺牲一个单元来区分队空和队满，入队时少用一个队列单元。约定“对头指针再队尾的指针的下一个位置作为队满的标志”
                队满条件：(Q.rear + 1)%MaxSize == Q.front
                对空条件：Q.front = Q.rear
                队中元素的个数：(Q.rear - Q.front + MaxSize)%MaxSize
            2）类型中增设表示元素的个数的数据成员。
                队空的条件：Q.size==0
                队满的条件：Q.size==MaxSize
            3）类型中增设tag数据成员，以区分是队满还是队空。
                tag==0，若因删除导致Q.front==Q.rear则为队空。
                tag==1，若因插入导致Q.front==Q.rear则为队满。
                
        循环队列的操作
            1）初始化
                void InitQueue(SqQueue &Q) {
                    Q.rear = Q.front = 0;       //初始化队首、队尾指针
                }
                
            2）判队空
                bool isEmpty(SqQueue Q) {
                    if (Q.rear == Q.front) return true;     //队空条件
                    else return false;
                }
            
            3）入队
                bool EnQueue(SqQueue &Q,ElemType x) {
                    if((Q.rear + 1))
                }
        
        
###### 2.3、队列的链式存储结构
    2.2.1、队列的链式存储
    
        队列的链式表示称为链队列；
        实际上是一个同时带有队头指针和队尾指针单链表。
        
        typedef struct {
            EleType data;
            struct LinkNode *next;
        }LinkNode;
        typedef struct {
             LinkNode *front, *rear;
        }LinkQueue;
        
    
    2.2.2、链式队列的基本操作
        1）初始化
            void InitQueue(LinkQueue &Q) {
                Q.front = Q.rear = (LinkQueue *)malloc(siziof(LinkNode));
                Q.front -> next = NULL;
            }
            
        2）判空操作
            bool IsEmpty(LinkQueue Q) {
                if (Q.front == Q.rear) return true;
                else return false;
            }
        
        3）入队操作
            void EnQueue(LinkQueue &Q,ElemType x) {
                LinkNode *s = (LinkQueue *)malloc(sizeof(LinkNode));
                s -> data = x;
                s -> next = NULL;
                Q.rear -> next = s;
                Q.rear = s;
            }
            
        4）出队操作
            bool DeQueue(LinkQueue &Q,ElemType &x){
                if (Q.front == Q.rear) return false; //空队
                LinkNode *p = Q.front -> next;
                x = p -> data;
                Q.front -> next = p -> next;
                if (Q.rear == p) {
                    Q.rear = Q.front;
                }
                free(p);
                return true;
            }
###### 2.4、双端队列

    2.4.1、双端队列的概念及分类
        
        双端队列:是指允许两端都可以进行入队和出队操作的队列。其元素的逻辑结构也是线性结构。
        
        分类：正常的双端队列；输出受限的双端队列；输入受限的双端队列。
        
    2.4.2、输出受限的双端队列
        
        允许在一端进行插入和删除，但在另一端只允许插入操作。
        
    2.4.3、输入受限的双端队列
    
        允许在一端进行插入和删除，但在另一端只允许删除操作。
        
#### 3、栈和队列的应用
###### 3.1、栈在括号匹配中的应用
###### 3.2、栈在表达式求值中的应用
###### 3.3、栈在递归中的应用
###### 3.4、队列在层次遍历中的应用
###### 3.5、队列在计算机系统中的应用
#### 4、特殊矩阵的压缩存储
###### 4.1、数组的定义
###### 4.2、数组的存储结构
###### 4.3、矩阵的压缩存储
###### 4.4、稀疏矩阵