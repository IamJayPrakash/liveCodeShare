export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string; // HTML string
    tags: string[];
    readTime: string;
    date: string;
    author: string;
    image?: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: 'js-advanced-interview-2026',
        title: '20+ Advanced JavaScript Interview Questions (2026)',
        excerpt: 'Crack your Senior Developer interview. Deep dive into Event Loop, Coercion, Closures, and Async patterns.',
        content: `
<h2>Part 1: The Engine & Runtime</h2>
<p class="lead">To master JavaScript, you must understand what happens under the hood. We move beyond syntax into execution contexts, memory, and the event loop.</p>
<hr class="my-8 border-border/20" />

<h3>1. Deep Dive: The Node.js Event Loop</h3>
<p>Many developers mistake the Node.js event loop for the browser's. While similar, Node.js uses <strong>libuv</strong> to handle I/O operations and has distinct phases.</p>
<p><strong>The Phases in Detail:</strong></p>
<ul class="list-disc pl-6 space-y-2 mb-4">
 <li><strong>Timers:</strong> This is where <code>setTimeout()</code> and <code>setInterval()</code> callbacks are executed. The loop checks if the timer threshold has passed.</li>
 <li><strong>Pending Callbacks:</strong> Executes I/O callbacks deferred to the next loop iteration (e.g., some TCP errors).</li>
 <li><strong>Idle, Prepare:</strong> Used internally by libuv.</li>
 <li><strong>Poll:</strong> The most crucial phase. It retrieves new I/O events (file reads, network requests) and executes their callbacks. If the poll queue is empty, it might block here waiting for I/O.</li>
 <li><strong>Check:</strong> Specifically for <code>setImmediate()</code>. It allows you to execute scripts immediately after the poll phase completes, preventing I/O starvation.</li>
 <li><strong>Close Callbacks:</strong> Clean-up code like <code>socket.on('close')</code>.</li>
</ul>
<div class="bg-muted/30 p-4 rounded-lg my-4 border-l-4 border-primary">
    <strong>Microtasks (Promises) vs Macrotasks:</strong> Microtasks (Promises, <code>process.nextTick</code>) have high priority. They are executed <em>immediately</em> after the current operation completes, effectively draining the microtask queue before moving to the next event loop phase.
</div>

<hr class="my-8 border-border/20" />

<h3>2. Hoisting & The Temporal Dead Zone (TDZ)</h3>
<p><strong>Question:</strong> Analyze this code execution flow.</p>
<pre><code class="language-javascript">console.log(x); // undefined
var x = 5;

console.log(y); // ReferenceError
let y = 10;</code></pre>
<p><strong>Detailed Explanation:</strong></p>
<p>JavaScript execution happens in two phases: <strong>Creation</strong> and <strong>Execution</strong>.</p>
<ul>
 <li><strong>Creation Phase:</strong> The engine scans for declarations.
   <ul>
     <li><code>var x</code> is allocated memory and initialized to <code>undefined</code>. This is "Hoisting".</li>
     <li><code>let y</code> is allocated memory but <strong>not initialized</strong>. It enters the <strong>Temporal Dead Zone (TDZ)</strong>. Accessing it before the line <code>let y = 10</code> throws a ReferenceError.</li>
   </ul>
 </li>
 <li><strong>Execution Phase:</strong> Code runs line by line.</li>
</ul>

<hr class="my-8 border-border/20" />

<h3>3. Polyfills: Implementing Promise.all</h3>
<p><strong>Scenario:</strong> You are in an environment without <code>Promise.all</code>. Write it.</p>
<p><strong>Logic:</strong> We need to return a new Promise. We must track how many promises have resolved. If <i>all</i> resolve, we resolve the array of results. If <i>any</i> reject, we reject immediately.</p>
<pre><code class="language-javascript">function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
        return reject(new TypeError('Argument must be an array'));
    }
    
    let results = [];
    let completedCount = 0;
    
    // Handle empty array case
    if (promises.length === 0) {
        resolve(results);
        return;
    }

    promises.forEach((p, index) => {
      // Use Promise.resolve to handle non-promise values (e.g., numbers)
      Promise.resolve(p).then(val => {
        results[index] = val; // Store in correct order, not arrival order
        completedCount++;
        if(completedCount === promises.length) {
            resolve(results);
        }
      }).catch(error => {
        reject(error); // Fail fast logic
      });
    });
  });
}</code></pre>

<hr class="my-8 border-border/20" />

<h2>Part 2: Scopes & Closures</h2>

<h3>4. Closures & Memory Leaks</h3>
<p><strong>Concept:</strong> A closure is a function bundled together with references to its surrounding state (lexical environment). It gives you access to an outer function’s scope from an inner function.</p>
<p><strong>The Danger (Memory Leaks):</strong></p>
<p>If a closure is stored in a way that prevents garbage collection (e.g., attached to a global event listener), the variables it references stay in memory forever.</p>
<pre><code class="language-javascript">function attachHandler() {
    const hugeObject = new Array(1000000).fill('data');
    
    // This closure captures 'hugeObject'
    document.getElementById('btn').addEventListener('click', () => {
        console.log(hugeObject.length);
    });
}
// Even after attachHandler finishes, 'hugeObject' cannot be cleaned up
// because the event listener (a closure) still refers to it.</code></pre>

<hr class="my-8 border-border/20" />

<h3>5. Advanced 'this' Binding</h3>
<p>The value of <code>this</code> depends entirely on <strong>call site</strong> (how the function calls).</p>
<ul>
 <li><strong>Default Binding:</strong> <code>func()</code> -> <code>window</code> (or <code>undefined</code> in strict mode).</li>
 <li><strong>Implicit Binding:</strong> <code>obj.func()</code> -> <code>obj</code>.</li>
 <li><strong>Explicit Binding:</strong> <code>func.call(ctx)</code>, <code>func.apply(ctx)</code> -> <code>ctx</code>.</li>
 <li><strong>New Binding:</strong> <code>new Func()</code> -> the newly created object.</li>
 <li><strong>Lexical Binding (Arrow Functions):</strong> Inherits <code>this</code> from the parent scope at definition time. It cannot be changed with <code>bind/call/apply</code>.</li>
</ul>

<hr class="my-8 border-border/20" />

<h2>Part 3: Objects & Prototypes</h2>

<h3>6. Deep vs Shallow Copy</h3>
<p><strong>Shallow Copy:</strong> <code>{...obj}</code> or <code>Object.assign({}, obj)</code>. It copies properties, but if a property is an object, it copies the <em>reference</em> to that object. Modifying the nested object in the copy affects the original.</p>
<p><strong>Deep Copy:</strong> Recursively copies all properties.</p>
<ul>
    <li>History: <code>JSON.parse(JSON.stringify(obj))</code> (Fails on Dates, Functions, undefined).</li>
    <li>Modern: <code>structuredClone(obj)</code>. This is the standard API that handles cyclic references and most data types correctly.</li>
</ul>

<hr class="my-8 border-border/20" />

<h3>7. Currying & Partial Application</h3>
<p><strong>Currying</strong> is transforming <code>f(a,b,c)</code> into <code>f(a)(b)(c)</code>. It allows you to create specialized functions.</p>
<pre><code class="language-javascript">// Generic logger
const log = (level) => (msg) => console.log(\`[\${level}] \${msg}\`);

// Specialized loggers
const debug = log('DEBUG');
const error = log('ERROR');

debug('System started'); // [DEBUG] System started
error('Crash!'); // [ERROR] Crash!</code></pre>

<hr class="my-8 border-border/20" />

<h2>Part 4: Rapid Fire Concepts (8-20)</h2>

<div class="grid grid-cols-1 gap-6">
    <div>
        <strong>8. What is Coercion?</strong>
        <p class="text-muted-foreground text-sm mt-1">Implicit type conversion. <code>'5' + 3</code> becomes <code>'53'</code> (string concat), but <code>'5' - 3</code> becomes <code>2</code> (numeric subtraction). It causes bugs if not understood.</p>
    </div>
    
    <div>
        <strong>9. Why separate == and ===?</strong>
        <p class="text-muted-foreground text-sm mt-1"><code>==</code> allows coercion (loose equality). <code>null == undefined</code> is true. <code>===</code> checks value AND type (strict equality). Always default to <code>===</code>.</p>
    </div>

    <div>
        <strong>10. Debouncing vs Throttling</strong>
        <p class="text-muted-foreground text-sm mt-1"><strong>Debounce:</strong> "Wait until the user stops doing parallel actions" (e.g., search bar). <strong>Throttle:</strong> "Execute at a steady rate" (e.g., scroll listeners, window resize).</p>
    </div>

    <div>
        <strong>11. What is a Polyfill?</strong>
        <p class="text-muted-foreground text-sm mt-1">Code that implements a feature on web browsers that do not support the feature. It fills the "gap" in the browser's implementation.</p>
    </div>

    <div>
        <strong>12. Unary Plus Operator</strong>
        <p class="text-muted-foreground text-sm mt-1">Putting a <code>+</code> before a string tries to convert it to a number. <code>+'123' === 123</code>. It's the fastest way to parse numbers compared to <code>parseInt</code>.</p>
    </div>
    
    <div>
        <strong>13. NaN (Not a Number)</strong>
        <p class="text-muted-foreground text-sm mt-1">It is the only value in JS that is not equal to itself. <code>NaN === NaN</code> is false. Use <code>Number.isNaN()</code> to check.</p>
    </div>

    <div>
        <strong>14. "use strict"</strong>
        <p class="text-muted-foreground text-sm mt-1">Enables Strict Mode. It catches silent errors (assigning to undefined globals), prevents <code>with</code> statement, and secures <code>this</code> in functions.</p>
    </div>

    <div>
        <strong>15. Event Bubbling vs Capturing</strong>
        <p class="text-muted-foreground text-sm mt-1">Events propagate in three phases: Capture (Root to Target), Target, and Bubble (Target to Root). Most Frameworks use Bubbling by default. You use <code>e.stopPropagation()</code> to stop it.</p>
    </div>

    <div>
        <strong>16. Service Workers</strong>
        <p class="text-muted-foreground text-sm mt-1">Scripts that act as proxy servers between the web app and the network. They enable Offline capabilities (PWA), background sync, and push notifications.</p>
    </div>

    <div>
        <strong>17. WebAssembly (Wasm)</strong>
        <p class="text-muted-foreground text-sm mt-1">A low-level binary format that runs with near-native performance. It allows C++, Rust, and Go to run in the browser alongside JS.</p>
    </div>
    
    <div>
        <strong>18. The DOM (Document Object Model)</strong>
        <p class="text-muted-foreground text-sm mt-1">An interface that treats an HTML document as a tree structure. Each node is an object representing a part of the document.</p>
    </div>

    <div>
        <strong>19. Pure Functions</strong>
        <p class="text-muted-foreground text-sm mt-1">A function that, given the same input, always returns the same output and has no side effects. This is the core of Functional Programming and Redux.</p>
    </div>

    <div>
        <strong>20. Higher-Order Functions</strong>
        <p class="text-muted-foreground text-sm mt-1">Functions that take other functions as arguments (callbacks) or return functions (factories). Examples: <code>map</code>, <code>filter</code>, <code>reduce</code>.</p>
    </div>
</div>
`,
        tags: ['JavaScript', 'Interview', 'Senior'],
        readTime: '20 min read',
        date: 'Jan 28, 2026',
        author: 'Senior Architect',
        image: 'bg-gradient-to-br from-yellow-400 to-amber-600'
    },
    {
        id: 'python-oops-mastery',
        title: 'Python OOPs: From Basics to Meta-Classes',
        excerpt: 'Understanding MRO, Dunder methods, and Decorators in Python Object-Oriented Programming.',
        content: `
<h2>Object-Oriented Python Deep Dive</h2>
<p class="lead">Python is not just a scripting language. Its Object Model is powerful, dynamic, and exposes internals via "Magic Methods". Here is your masterclass.</p>

<hr class="my-8 border-border/20" />

<h3>1. Method Resolution Order (MRO) & The Diamond Problem</h3>
<p>In multiple inheritance languages, the "Diamond Problem" occurs when two parent classes inherit from the same grandparent. Usage of the method becomes ambiguous.</p>
<p>Python 3 uses the <strong>C3 Linearization</strong> algorithm to flatten the inheritance tree into a predictable list.</p>
<pre><code class="language-python">class A:
    def process(self): print("A")

class B(A):
    def process(self): print("B")

class C(A):
    def process(self): print("C")

class D(B, C):
    pass

# When we call D().process(), what happens?
d = D()
d.process() # Output: "B"

print(D.mro())
# Output: [<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>]</code></pre>
<p>Python searches the MRO list left-to-right. It finds <code>process</code> in B first. If B didn't have it, it extends to C.</p>

<hr class="my-8 border-border/20" />

<h3>2. Magic (Dunder) Methods Explained</h3>
<p>Python allows you to override built-in operators by defining "Double Underscore" methods.</p>
<ul class="list-disc pl-6 space-y-4">
    <li>
        <strong>__new__ vs __init__</strong>
        <br/><code>__new__</code> is the actual constructor. It returns the instance. <code>__init__</code> is the initializer. It sets up the attributes <em>after</em> the instance is created.
    </li>
    <li>
        <strong>__str__ vs __repr__</strong>
        <br/><code>__str__</code> is for end-users (pretty print). <code>__repr__</code> is for developers (unambiguous, preferably executable code).
    </li>
    <li>
        <strong>__call__</strong>
        <br/>Allows an instance to be called like a function: <code>obj()</code>.
    </li>
</ul>

<hr class="my-8 border-border/20" />

<h3>3. Decorators: Under the Hood</h3>
<p>A decorator is simply a callable that takes a function and returns a function. Use <code>functools.wraps</code> to preserve metadata.</p>
<pre><code class="language-python">import functools

def transaction(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print("Starting Transaction...")
        try:
            result = func(*args, **kwargs)
            print("Commit.")
            return result
        except Exception:
            print("Rollback!")
            raise
    return wrapper

@transaction
def save_data(data):
    print(f"Saving {data}")

save_data({"id": 1})</code></pre>

<hr class="my-8 border-border/20" />

<h3>4. Descriptors & Properties</h3>
<p>The <code>@property</code> decorator allows you to define methods that behave like attributes. Under the hood, this uses the Descriptor Protocol (<code>__get__</code>, <code>__set__</code>).</p>
<pre><code class="language-python">class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

c = Circle(10)
c.radius = 20 # OK
# c.radius = -5 # Raises Error</code></pre>

<hr class="my-8 border-border/20" />

<h3>5. Metaclasses</h3>
<p><strong>Classes are objects.</strong> Who creates them? A Metaclass. The default is <code>type</code>.</p>
<p>You can intercept class creation to enforce rules (e.g., "All class attribute names must be uppercase").</p>
<pre><code class="language-python">class SingletonMeta(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Database(metaclass=SingletonMeta):
    def connect(self): pass

# d1 and d2 will be the EXACT same object instance
d1 = Database()
d2 = Database()
print(d1 is d2) # True</code></pre>
`,
        tags: ['Python', 'OOP', 'Backend'],
        readTime: '15 min read',
        date: 'Jan 25, 2026',
        author: 'Py Guru',
        image: 'bg-gradient-to-br from-blue-500 to-cyan-400'
    },
    {
        id: 'java-concurrency-multithreading',
        title: 'Java Concurrency & Multithreading Guide',
        excerpt: 'Mastering Threads, Locks, and the Fork/Join Framework in Java.',
        content: `
<h2>Comprehensive Java Concurrency</h2>
<p class="lead">Java was designed with threading in mind from day one. In modern backend systems, concurrency is non-negotiable. This guide covers from basics to Project Loom.</p>

<hr class="my-8 border-border/20" />

<h3>1. Threads vs Runnables vs Callables</h3>
<ul>
    <li><strong>Thread:</strong> A class representing a thread of execution. Inheriting from it prevents you from extending other classes.</li>
    <li><strong>Runnable:</strong> A functional interface representing a "task" that returns void.</li>
    <li><strong>Callable:</strong> Like Runnable, but returns a result and can throw a checked Exception.</li>
</ul>

<hr class="my-8 border-border/20" />

<h3>2. Memory Model & The 'volatile' Keyword</h3>
<p>In a multicore CPU, each core has its own Cache (L1/L2). Threads running on different cores might see different values for a shared variable.</p>
<p><strong>Effect of <code>volatile</code>:</strong></p>
<ol class="list-decimal pl-6">
    <li>Guarantees <strong>Visibility</strong>: Reads/Writes go directly to Main Memory (RAM).</li>
    <li>Prevents <strong>Instruction Reordering</strong>: The compiler won't optimize/rearrange code around a volatile variable access.</li>
</ol>
<p><em>Note: It does NOT guarantee atomicity. For that, use <code>AtomicInteger</code> or synchronization.</em></p>

<hr class="my-8 border-border/20" />

<h3>3. Synchronization vs ReentrantLock</h3>
<p>The <code>synchronized</code> keyword is implicit. <code>ReentrantLock</code> offers more control (tryLock, lockInterruptibly).</p>
<pre><code class="language-java">private final ReentrantLock lock = new ReentrantLock();

public void perform() {
    if (lock.tryLock()) {
        try {
            // critical section
        } finally {
            lock.unlock();
        }
    } else {
        // do something else
    }
}</code></pre>

<hr class="my-8 border-border/20" />

<h3>4. CompletableFuture (Async Java)</h3>
<p>The old <code>Future</code> interface blocked the main thread (using <code>.get()</code>). <code>CompletableFuture</code> allows true non-blocking pipelines.</p>
<pre><code class="language-java">CompletableFuture.supplyAsync(() -> userService.getUser(id)) // Run in ForkJoinPool
    .thenCompose(user -> orderService.getOrders(user))       // Chain another async task
    .thenApply(orders -> calculateTotal(orders))            // Transform result
    .exceptionally(ex -> {
        logger.error("Failed", ex);
        return BigDecimal.ZERO;                             // Fallback value
    })
    .thenAccept(total -> System.out.println("Total: " + total));</code></pre>

<hr class="my-8 border-border/20" />

<h3>5. Atomic Variables</h3>
<p>Classes in <code>java.util.concurrent.atomic</code> (e.g., <code>AtomicInteger</code>) use CAS (Compare-And-Swap) machine instructions for lock-free thread safety.</p>
<pre><code class="language-java">AtomicInteger counter = new AtomicInteger(0);
int newValue = counter.incrementAndGet(); // Thread-safe without 'synchronized'</code></pre>

<hr class="my-8 border-border/20" />

<h3>6. Virtual Threads (Project Loom - Java 21+)</h3>
<p>Traditional Java threads map 1:1 to OS threads, which are expensive (1MB stack). You can only have ~10k threads.</p>
<p><strong>Virtual Threads</strong> are lightweight (User-mode threads) managed by the JVM. You can spawn <strong>millions</strong> of them.</p>
<pre><code class="language-java">try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 10_000).forEach(i -> {
        executor.submit(() -> {
            Thread.sleep(Duration.ofSeconds(1));
            return i;
        });
    });
}</code></pre>
`,
        tags: ['Java', 'Multithreading', 'Backend'],
        readTime: '25 min read',
        date: 'Jan 22, 2026',
        author: 'Backend Lead',
        image: 'bg-gradient-to-br from-red-600 to-orange-600'
    },
    {
        id: 'cpp-memory-management',
        title: 'C++ Memory Management & Pointers',
        excerpt: 'Smart Pointers, RAII, and avoiding Memory Leaks in Modern C++.',
        content: `
<h2>Modern C++: Managing Resources Safely</h2>
<p class="lead">C++ gives you manual control over memory. With great power comes the responsibility to not leak 10GB of RAM. We explore modern best practices.</p>

<hr class="my-8 border-border/20" />

<h3>1. RAII (Resource Acquisition Is Initialization)</h3>
<p>This is the greatest pattern in C++. You wrap a resource (heap memory, file handle, mutex) in a stack-allocated object. When that object goes out of scope, its <strong>Destructor</strong> releases the resource.</p>
<p><strong>No more manual <code>delete</code> or <code>close()</code>!</strong></p>

<hr class="my-8 border-border/20" />

<h3>2. Smart Pointers (C++11/14/17)</h3>
<p>Included in <code>&lt;memory&gt;</code>, these are RAII wrappers for pointers. Never use raw <code>new</code>/<code>delete</code>.</p>

<h4>std::unique_ptr</h4>
<p>Owning pointer. Cannot be copied, only moved. Ensures only one owner exists. O(0) overhead.</p>
<pre><code class="language-cpp">std::unique_ptr<User> u1 = std::make_unique<User>("John");
// std::unique_ptr<User> u2 = u1; // ERROR! Compilation fails.
std::unique_ptr<User> u2 = std::move(u1); // OK. u1 is now empty.</code></pre>

<h4>std::shared_ptr</h4>
<p>Reference counted pointer. Copying increases the count. Memory is freed when the last pointer dies. Thread-safe control block (but not the object itself).</p>

<h4>std::weak_ptr & The Cycle Problem</h4>
<p>If Object A holds a <code>shared_ptr</code> to B, and B holds a <code>shared_ptr</code> to A, the reference count never hits zero. Memory Leak!</p>
<p><strong>Solution:</strong> B should hold a <code>weak_ptr</code> to A. It allows access but doesn't increase the reference count. It must be locked to use.</p>

<hr class="my-8 border-border/20" />

<h3>3. The Rule of Five</h3>
<p>If you define one of these, you should define all five to ensure safe resource management:</p>
<ol class="list-decimal pl-6 space-y-2">
    <li>Destructor</li>
    <li>Copy Constructor</li>
    <li>Copy Assignment Operator</li>
    <li>Move Constructor</li>
    <li>Move Assignment Operator</li>
</ol>

<hr class="my-8 border-border/20" />

<h3>4. Move Semantics (&& r-value references)</h3>
<p>Before C++11, returning a large <code>std::vector</code> from a function meant copying every element. Slow.</p>
<p>With Move Semantics, the receiving object "steals" the internal data pointer from the temporary object. It is a constant time O(1) pointer swap.</p>
<pre><code class="language-cpp">std::vector<int> createBigVector() {
    std::vector<int> v(1000000);
    return v; // Implicitly moved, not copied!
}</code></pre>

<hr class="my-8 border-border/20" />

<h3>5. Memory Leaks vs Dangling Pointers</h3>
<ul>
    <li><strong>Memory Leak:</strong> Memory is allocated but never freed. (Solved by Smart Pointers).</li>
    <li><strong>Dangling Pointer:</strong> A pointer references memory that has already been freed. (Solved by setting to nullptr after delete, or using Weak Pointers).</li>
</ul>
`,
        tags: ['C++', 'System', 'Performance'],
        readTime: '20 min read',
        date: 'Jan 20, 2026',
        author: 'Systems Eng',
        image: 'bg-gradient-to-br from-indigo-500 to-purple-600'
    },
    {
        id: 'react-hooks-cheatsheet',
        title: 'React Hooks: The Ultimate Cheatsheet',
        excerpt: 'Stop guessing dependency arrays. A rapid guide to useEffect, useMemo, useCallback, and more.',
        content: `
<h2>React Hooks Deep Dive</h2>
<p class="lead">A complete reference to the hooks that power modern React development. No more stale closures or infinite loops.</p>

<hr class="my-8 border-border/20" />

<h3>1. useEffect</h3>
<p><strong>Purpose:</strong> Handle side effects (API calls, subscriptions, DOM manipulation).</p>
<p><strong>Dependency Rules:</strong></p>
<ul class="list-disc pl-6">
    <li><code>[]</code> (Empty): Runs once on mount (ComponentDidMount).</li>
    <li><code>[prop, state]</code>: Runs on mount AND whenever <code>prop</code> or <code>state</code> changes.</li>
    <li>No Array: Runs on EVERY render. (Dangerous).</li>
</ul>
<pre><code class="language-javascript">useEffect(() => {
  const timer = setInterval(() => count++, 1000);
  return () => clearInterval(timer); // Cleanup function (ComponentWillUnmount)
}, []);</code></pre>

<hr class="my-8 border-border/20" />

<h3>2. useMemo vs useCallback</h3>
<p>Both are performance optimizations. They rely on referential equality.</p>
<h4>useMemo</h4>
<p>Caches the <strong>Result</strong> of a heavy computation.</p>
<pre><code class="language-javascript">const expensiveValue = useMemo(() => {
    return heavyCalculation(a, b);
}, [a, b]);</code></pre>

<h4>useCallback</h4>
<p>Caches the <strong>Function Reference</strong> itself. This is crucial when passing functions to child components wrapped in <code>React.memo</code>.</p>
<pre><code class="language-javascript">const handleClick = useCallback(() => {
    console.log("Clicked");
}, []); // Without this, a new function is created every render</code></pre>

<hr class="my-8 border-border/20" />

<h3>3. useRef</h3>
<p><strong>Purpose:</strong> Access DOM elements OR store mutable values that <strong>persists across renders without triggering a re-render</strong>.</p>
<pre><code class="language-javascript">const inputRef = useRef(null);
const countRef = useRef(0);

// Modify without re-rendering
countRef.current++; 

// Access DOM
inputRef.current.focus();</code></pre>

<hr class="my-8 border-border/20" />

<h3>4. useReducer</h3>
<p><strong>Purpose:</strong> Complex state logic. Alternative to <code>useState</code> when state depends on previous state or has multiple sub-values.</p>
<pre><code class="language-javascript">const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return {count: state.count + 1};
    default: throw new Error();
  }
}</code></pre>

<hr class="my-8 border-border/20" />

<h3>5. useLayoutEffect</h3>
<p><strong>Scenario:</strong> You need to measure the width of a <code>div</code> and resize it <em>before</em> the user sees it.</p>
<p>If you use <code>useEffect</code>, the browser paints the initial size, then your effect runs, then the browser repaints the new size. User sees a "flicker".</p>
<p><code>useLayoutEffect</code> runs synchronously immediately after DOM mutations but before the Paint. No flicker.</p>
`,
        tags: ['React', 'Hooks', 'Cheatsheet'],
        readTime: '15 min read',
        date: 'Jan 18, 2026',
        author: 'Frontend Ninja',
        image: 'bg-gradient-to-br from-cyan-400 to-blue-600'
    },
    {
        id: 'vscode-shortcuts',
        title: 'Mastering VS Code Shortcuts',
        excerpt: 'Boost your productivity with these essential VS Code shortcuts that every developer should know.',
        content: `
<h2>VS Code Productivity Masterclass</h2>
<p class="lead">Stop using your mouse. These shortcuts are the difference between a Junior and a Senior workflow.</p>

<hr class="my-8 border-border/20" />

<h3>1. Essential Navigation</h3>
<ul class="list-disc pl-6 space-y-2">
    <li><strong>Cmd + P</strong> (Quick Open): Navigate to files by name. Type <code>:</code> to jump to a specific line number.</li>
    <li><strong>Cmd + Shift + P</strong> (Command Palette): Run any command (Git, Extensions, Settings).</li>
    <li><strong>Ctrl + Tab</strong>: Switch between recently opened files.</li>
    <li><strong>Cmd + B</strong>: Toggle Sidebar visibility.</li>
</ul>

<hr class="my-8 border-border/20" />

<h3>2. Text Editing & Refactoring</h3>
<ul class="list-disc pl-6 space-y-2">
    <li><strong>Cmd + D</strong>: Multi-cursor selection. Select a word, hit Cmd+D repeatedly to select the next occurrences. Type once, change all.</li>
    <li><strong>Option + Click</strong>: Place cursors manually anywhere.</li>
    <li><strong>Option + Up/Down</strong>: Move the current line up or down.</li>
    <li><strong>Shift + Option + Up/Down</strong>: Duplicate the current line up or down.</li>
    <li><strong>Cmd + /</strong>: Toggle comment.</li>
</ul>

<hr class="my-8 border-border/20" />

<h3>3. Intelligence & Debugging</h3>
<ul class="list-disc pl-6 space-y-2">
    <li><strong>F12</strong>: Go to Definition.</li>
    <li><strong>Shift + F12</strong>: Peek References (See where the function is used without leaving the file).</li>
    <li><strong>F2</strong>: Rename Symbol. Renames the variable safely across the entire project/file.</li>
    <li><strong>F5</strong>: Start Debugging.</li>
    <li><strong>F9</strong>: Toggle Breakpoint.</li>
</ul>

<hr class="my-8 border-border/20" />

<h3>4. Terminal & Panels</h3>
<ul class="list-disc pl-6 space-y-2">
    <li><strong>Ctrl + \`</strong>: Toggle Integrated Terminal.</li>
    <li><strong>Cmd + \\</strong>: Split Editor to the side. Allows coding in two files side-by-side.</li>
    <li><strong>Cmd + + / -</strong>: Zoom In / Out.</li>
</ul>
`,
        tags: ['Productivity', 'VS Code', 'Shortcuts'],
        readTime: '10 min read',
        date: 'Jan 15, 2026',
        author: 'LiveCode Team',
        image: 'bg-gradient-to-br from-blue-500 to-indigo-600'
    }
];
