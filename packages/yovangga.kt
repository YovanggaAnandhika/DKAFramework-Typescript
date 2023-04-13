// Kotlin interview questions
// Author: Lucy Teknology

/* Instructions
    1. Complete the questions below in your preferred text editor
    2. Save the file as "kotlin-interview-questions-**Your name**.kt"
    3. Upload the file to gist.github.com as a public/secret gist
    4. Inform Lucy Teknology via email or WhatsApp with the link to your gist

    WARNING: It is best to complete these questions to the best of your ability.
    Without the need to Google AND ESPECIALLY without copying and pasting from the internet.
    Using ChatGPT to answer these questions will not help you in the live coding interview.
    Please refrain from copy pasting ChatGPT answers.
*/

// Participant Form
// Name                     : **Yovangga Anandhika**
// Email                    : **dhikaprivate@gmail.com**
// Phone number (WA only)   : **08988212660**

// Question 1: What is the difference between a class and an object in Kotlin?
/*
    Answer: Classes provide a framework from which objects can be built. An object is an instance of a class which contains data specific to an object
    Kelas menyediakan kerangka kerja dari mana objek dapat dibangun. Objek adalah turunan dari kelas yang berisi data khusus untuk suatu objek
*/

// ----------------------------------------------------------------------------

// Question 2: What is the difference between a data class and a regular class in Kotlin?
/*
    Answer: data class is data model in my opinion. which is used to formalize data that contains getters and setters.
    while the regular class is a complete form that contains structure. and interface if any
    ..
    kelas data adalah model data menurut saya. yang digunakan untuk memformalkan data yang berisi getter dan setter.
    sedangkan kelas reguler adalah bentuk lengkap yang mengandung struktur. dan antarmuka jika ada

*/

// ----------------------------------------------------------------------------

// Question 3: What is the difference between a class and an interface in Kotlin?
/*
        Answer: like I said in the previous answer. that class contains methods and a complete set of functions in OOP procedures. While Interface is a property declaration that provides an implementation for its accessors
        seperti yang saya katakan di jawaban sebelumnya. kelas itu berisi metode dan satu set lengkap fungsi dalam prosedur OOP. Sedangkan Interface adalah deklarasi properti yang menyediakan implementasi bagi pengaksesnya
*/

// Questions 3a. complete the code below to create an interface

interface Animal {
    fun makeSound()
    fun eat()
}

interface CanWalk {
    fun walk()
    fun run()
}

interface CanSwim {
    fun swim()
}

interface CanFly {
    fun fly()
}

// Create a classes: Cat, Fish, Bird, and Airplane that implements the correct interfaces

public class Cat() : CanWalk, Animal {
    override fun eat() { /** another code **/}
    override fun makeSound() { /** another code **/ }
    override fun walk() { /** another code **/ }
    override fun run() { /** another code **/ }
}

public class Fish : Animal, CanSwim {
    override fun eat() { /** another code **/}
    override fun makeSound() { /** another code **/ }
    override fun swim() { /** another code **/ }
}

public class Bird() : Animal, CanFly, CanWalk {
    override fun eat() { /** another code **/}
    override fun makeSound() { /** another code **/ }
    override fun fly() { /** another code **/ }
}
// ----------------------------------------------------------------------------

// Question 4: What is the difference between val and var in Kotlin?
/**
    Answer:
    Var is a Mutable object whose contents can be changed while Val is an Immutable object whose contents cannot be changed.
    *var adalah object mutable yang kontennya bisa dirubah. sedangkan val adalah object mutable yang kontennya tidak dapat dirubah
*/

// ----------------------------------------------------------------------------

// Question 5a: What is a lambda expression in Kotlin?
/*
    Answer: Lambda Expression is a boilerplate code for write a function.
    Lambda adalah funsi expresi singkat sebuah kode untuk menulis dan memanggil fungsi
*/

// Question 5b: Create a lambda expression that checks if a number is even
// Code below
fun example() {
    var mObject : object : FunctionCall { it ->
        /** it adalah variable yang ada di fungsi functionCall **/
    }
}

// Question 5c: What is a higher order function in Kotlin?
/*
    Answer: in a simple and easy to understand way.
    High-level functions are functions that are executed by calling other functions.
    can consist of more than one function or even hundreds of other function calls.
    it is used for mapping functions to OOP procedures in kotlin

    dengan cara yang sederhana dan mudah dipahami.
    Fungsi tingkat tinggi adalah fungsi yang dijalankan dengan memanggil fungsi lain.
    bisa terdiri dari lebih dari satu fungsi atau bahkan ratusan pemanggilan fungsi lainnya.
    ini digunakan untuk memetakan fungsi ke prosedur OOP di kotlin

*/

// Question 5d: Create an example of a high-order function that uses the lambda expression you created in Question 5b
// Code below

// ----------------------------------------------------------------------------

// Question 6: How do you create an extension function in Kotlin?
/*
    Answer: kotlin extension function is to add a method or a function to an existing function instance
    fungsi ekstensi kotlin adalah menambahkan method atau sebuah fungsi untuk turunan fungsi yang sudah ada
*/
fun String.removeFirstLastChar(): String =  this.substring(1, this.length - 1)

fun main(args: Array<String>) {
    val myString= "Hello Yovangga"
    val result = myString.removeFirstLastChar()
    println("First character is: $result")
}
// -----------------------------------------------------------------------------

// Question 7a: What is a sealed class / interface and how are they different from enums?
/*
    Answer:
    As the name suggests. An enclosed class is another form of class except it is a method that returns data.
    whereas enums are options for concrete values.

    Seperti namanya. Kelas tertutup adalah bentuk lain dari kelas kecuali itu adalah metode yang mengembalikan data.
    sedangkan enum adalah opsi untuk nilai konkret
 */

// Question 7b: Write a code that highligths the difference between sealed class / interface from enums!
// Code below
sealed class lucy(val data : String){
    class chasier:System("billing")
    class admin:System("administrator")
}
fun tampilkan(s : lucy){
    when(s){
        is lucy.admin -> println("${s.data} used level from work")
        is lucy.chasier -> println("${s.data} used system billing")
    }
}

fun main(args: Array<String>){
    val administrator=lucy.admin()
    val cashier=lucy.chasier()

    tampilkan(administrator)
    tampilkan(cashier)
}
// ----------------------------------------------------------------------------

// Question 8a: How do you mark a function as asynchronous in Kotlin?
/*
    Answer: i marked asynchronous function using Suspend fun. I usually use the library from CoroutineScope to do the viewmodel. based on the android jetpack architecture
    saya menandai fungsi asinkron menggunakan Suspend fun. Saya biasanya menggunakan library dari CoroutineScope untuk melakukan viewmodel. berdasarkan arsitektur android jetpack
*/

// Question 8b: Write down a code snippet that executes a function asynchronously!
// Code below
CoroutineScope(Dispatchers.Main).async {
    /** Another Code **/
}
// ----------------------------------------------------------------------------

// Question 9a: What is a "Flow" in kotlin?
/*
    Answer: flow is a successive asynchronous flow that executes a program until the flows are collected. usually it is used for looping in the background
    flow adalah aliran asinkron berturut-turut yang mengeksekusi program sampai aliran dikumpulkan.
    biasanya digunakan untuk perulangan di latar belakang
*/

// Question 9b: What is the difference between a "Flow" and a "StateFlow"?
/*
    Answer: flow is the caps running the program until the flow is collected. while stateFlow is almost the same as live data. the difference is that the state stream requires an initial value. whereas liveData is not. therefore in my opinion livedata is better because it avoids zero error exceptions compared to StateFlow
    aliran adalah batas menjalankan program sampai aliran dikumpulkan.
    sedangkan stateFlow hampir sama dengan live data. perbedaannya adalah aliran negara membutuhkan nilai awal. sedangkan liveData tidak.
    oleh karena itu menurut saya livedata lebih baik karena menghindari pengecualian kesalahan nol dibandingkan dengan StateFlow
*/

// Question 9c: Write a code to transform the value emitted by the flow below in the following order:
//              1. emit only "even" numbers
//              2. multiply the number by 2 (x * 2)
//              3. change the type into String
/**
     *  val numberFlow = flowOf(listOf(1,2,3,4,5,6))
 */
// Code Below
val numberFlow = flowOf(listOf(1,2,3,4,5,6))
//###############################################
var mEvenNumberOnly : MutableList<Int> = arrayListOf()
var mMultiple2 : MutableList<Int> = arrayListOf()
//###############################################
fun isEven(value: Int) = value % 2 == 0
fun x2Multiple(value : Int) = value * 2

CoroutineScope(Dispatchers.Main).async {
    numberFlow.collect{
        /** clear Event Number **/
        mEvenNumberOnly.clear()
        //** for even number
        mMultiple2.clear()
        it.forEach { it ->
            if (isEven(it)){
                /** push Event Number **/
                mEvenNumberOnly.add(it)
            }
            mMultiple2.add(x2Multiple(it))
        }

        println(mEvenNumberOnly)
        println(mMultiple2)
        println(mMultiple2.toString())
    }
}
// ----------------------------------------------------------------------------

// Question 10: Create a stack implementation that can run the following code
// Code your stack implementation below

// Stack implementation in Kotlin
internal class Stack<T : Any>() {
    // store elements of stack
    private val arr : MutableList<T> = mutableListOf()

    // push elements to the top of stack
    fun push(x: T) {
        // insert element on top of stack
        println("Inserting float $x")
        arr.add(x)
    }

    // pop elements from top of stack
    fun pop(): T {
        // pop element from top of stack
        return arr[arr.size - 1]
    }

    // peek elements from peek of stack
    fun peek(): T {
        // peek element from peek of stack
        return arr[0]
    }

    fun isEmpty() : Boolean {
        return arr.size <= 1
    }

    companion object {
        fun main(args: Array<String?>?) {
            val stack = Stack<Int>()
            stack.push(1)
            stack.push(2)
            val popped = stack.pop() /*should return 2*/
            val peeked = stack.peek() /*should return 1*/
            val isEmpty = stack.isEmpty() /*should return false*/

            val floatStack = Stack<Float>()
            floatStack.push(1.0f)
            floatStack.push(2.0f)
            val poppedFloat = floatStack.pop() /*should return 2.0f*/
            val poppedFloat2 = floatStack.peek() // should return 1.0f
            val isEmptyFloat = floatStack.isEmpty() // should return true
        }
    }
}

