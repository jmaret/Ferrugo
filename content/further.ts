import { rust, type Lesson } from "./lessons";

export const furtherLessons: Lesson[] = [
  {
    id: "traits",
    chapter: "Shared behavior",
    title: "A trait names shared behavior",
    summary:
      "A trait is a set of methods a type can promise. impl attaches that promise to one type. The call pier.meters() works because Pier implements Meters.",
    code: rust(`
      trait Meters {
          fn meters(&self) -> u32;
      }

      struct Pier {
          span: u32,
      }

      impl Meters for Pier {
          fn meters(&self) -> u32 {
              self.span
          }
      }

      fn main() {
          let pier = Pier { span: 12 };
          println!("{}", pier.meters());
      }
    `),
    notice:
      "The trait says what a type can do. The impl says how Pier does it. Another struct can implement Meters with a different body.",
    checks: [
      {
        id: "traits-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "12" },
          { id: "b", label: "Pier" },
          { id: "c", label: "meters" },
        ],
        answer: "a",
        explanation: "pier.meters() runs the impl and returns the span field, which is 12.",
      },
      {
        id: "traits-missing",
        prompt: "What happens if you call meters on a struct that has no impl Meters?",
        options: [
          { id: "a", label: "It prints 0" },
          { id: "b", label: "It does not compile. The method exists only for types that implement the trait." },
          { id: "c", label: "It compiles and panics when the method is missing" },
        ],
        answer: "b",
        explanation: "The compiler only allows the call when it can see an impl of Meters for that type.",
      },
    ],
  },
  {
    id: "generics",
    chapter: "Shared behavior",
    title: "A generic function keeps the type open",
    summary:
      "wider is written once and used for any type that can be ordered. T stands for that type. PartialOrd is the bound that allows the comparison.",
    code: rust(`
      fn wider<T: PartialOrd>(left: T, right: T) -> T {
          if left > right { left } else { right }
      }

      fn main() {
          println!("{}", wider(4, 12));
      }
    `),
    notice:
      "Both arguments share one T, so they must be the same type. The bound is what makes > legal. i32 implements PartialOrd, which is why 4 and 12 are allowed.",
    checks: [
      {
        id: "generics-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "4" },
          { id: "b", label: "12" },
          { id: "c", label: "T" },
        ],
        answer: "b",
        explanation: "12 is greater than 4, so wider returns the right-hand value.",
      },
      {
        id: "generics-types",
        prompt: "What happens if the call is wider(4, \"12\")?",
        options: [
          { id: "a", label: "It prints 12, after turning the text into a number" },
          { id: "b", label: "It does not compile. Both arguments must be the same T." },
          { id: "c", label: "It prints 4, because a string is never wider" },
        ],
        answer: "b",
        explanation: "T is one type for the whole call. An i32 and a &str are not the same type, so there is no T that fits both.",
      },
    ],
  },
  {
    id: "lifetimes",
    chapter: "Shared behavior",
    title: "A lifetime ties a borrow to its source",
    summary:
      "choose returns one of the two borrows. The name 'a tells the compiler that the returned reference must not outlive either input. Both strings are still alive when name is printed.",
    code: rust(`
      fn choose<'a>(left: &'a str, right: &'a str, take_left: bool) -> &'a str {
          if take_left { left } else { right }
      }

      fn main() {
          let north = String::from("north");
          let south = String::from("south");
          let name = choose(&north, &south, true);
          println!("{name}");
      }
    `),
    notice:
      "'a is not a value at runtime. It is a promise about how long the borrow lasts. One lifetime on both inputs means the return is allowed to be either of them.",
    checks: [
      {
        id: "lifetimes-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "north" },
          { id: "b", label: "south" },
          { id: "c", label: "'a" },
        ],
        answer: "a",
        explanation: "take_left is true, so choose returns the borrow of north.",
      },
      {
        id: "lifetimes-local",
        prompt: "What happens if choose builds a String inside itself and tries to return a borrow of that local?",
        options: [
          { id: "a", label: "The caller receives the text, and the local stays alive" },
          { id: "b", label: "It does not compile. The local is dropped at the end of choose, so the borrow would dangle." },
          { id: "c", label: "It compiles and prints an empty string" },
        ],
        answer: "b",
        explanation: "A returned reference has to point at something the caller still owns. A local String is freed when the function returns.",
      },
    ],
  },
  {
    id: "modules",
    chapter: "Shared behavior",
    title: "A module hides what it does not publish",
    summary:
      "mod pier nests a scope inside this file. Items are private unless they are pub. main can call label because the function is public. The path is pier::label.",
    code: rust(`
      mod pier {
          pub fn label() -> &'static str {
              "north"
          }
      }

      fn main() {
          println!("{}", pier::label());
      }
    `),
    notice:
      "A module can live in this file or in its own file. Privacy is the same either way: the parent can see pub items, and private items stay inside the module.",
    checks: [
      {
        id: "modules-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "north" },
          { id: "b", label: "pier::label" },
          { id: "c", label: "Nothing. A module does not run." },
        ],
        answer: "a",
        explanation: "main calls the public function, and that function returns the string north.",
      },
      {
        id: "modules-private",
        prompt: "What happens if pub is removed from label?",
        options: [
          { id: "a", label: "It still prints north. Modules are only for organizing files." },
          { id: "b", label: "It does not compile. main is outside the module and cannot see a private function." },
          { id: "c", label: "It prints an empty string" },
        ],
        answer: "b",
        explanation: "Privacy is the default. Without pub, label is visible only inside pier.",
      },
    ],
  },
  {
    id: "iterators",
    chapter: "Lists and closures",
    title: "An iterator walks a list without a loop index",
    summary:
      "iter lends each item. copied turns &i32 into i32, which is allowed because integers are Copy. filter keeps values greater than 5, and collect builds a new Vec.",
    code: rust(`
      fn main() {
          let spans = [3, 12, 7];
          let long: Vec<i32> = spans.iter().copied().filter(|meters| *meters > 5).collect();
          println!("{}", long.len());
      }
    `),
    notice:
      "The array itself is unchanged. filter receives a reference to each item, so the closure writes *meters. The type on long is what tells collect which collection to build.",
    checks: [
      {
        id: "iterators-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "1" },
          { id: "b", label: "2" },
          { id: "c", label: "3" },
        ],
        answer: "b",
        explanation: "3 is dropped by the filter. 12 and 7 remain, so the new vector has length 2.",
      },
      {
        id: "iterators-source",
        prompt: "What is spans after this program runs?",
        options: [
          { id: "a", label: "Still [3, 12, 7]. The iterator borrowed it." },
          { id: "b", label: "[12, 7], because filter changed the array" },
          { id: "c", label: "Empty. collect moved the items out." },
        ],
        answer: "a",
        explanation: "iter borrows the array. copied duplicates each integer. The filtered vector is a separate value.",
      },
    ],
  },
  {
    id: "closures",
    chapter: "Lists and closures",
    title: "A closure can use the names around it",
    summary:
      "The vertical bars name the closure's arguments. extra is not an argument. The closure captures it from main and adds it when coat is called.",
    code: rust(`
      fn main() {
          let extra = 2;
          let coat = |meters: i32| meters + extra;
          println!("{}", coat(10));
      }
    `),
    notice:
      "A closure is a value. This one borrows extra. It can be called like a function, and it still sees the binding it captured.",
    checks: [
      {
        id: "closures-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "10" },
          { id: "b", label: "12" },
          { id: "c", label: "2" },
        ],
        answer: "b",
        explanation: "coat(10) adds the captured extra, so the result is 12.",
      },
      {
        id: "closures-capture",
        prompt: "Where does extra come from inside the closure?",
        options: [
          { id: "a", label: "It is captured from main" },
          { id: "b", label: "It is an argument the caller must pass" },
          { id: "c", label: "It is a global that every closure can see" },
        ],
        answer: "a",
        explanation: "extra is a binding in main. The closure uses it without listing it between the bars, which is a capture.",
      },
    ],
  },
  {
    id: "trait-objects",
    chapter: "Lists and closures",
    title: "dyn keeps the trait and forgets the concrete type",
    summary:
      "Pier and Cable are different structs. Both implement Label. Box<dyn Label> lets one vector hold either, because the box stores a pointer to the value and to the trait's methods.",
    code: rust(`
      trait Label {
          fn name(&self) -> &'static str;
      }

      struct Pier;
      struct Cable;

      impl Label for Pier {
          fn name(&self) -> &'static str {
              "pier"
          }
      }

      impl Label for Cable {
          fn name(&self) -> &'static str {
              "cable"
          }
      }

      fn main() {
          let parts: Vec<Box<dyn Label>> = vec![Box::new(Pier), Box::new(Cable)];
          println!("{}", parts.len());
      }
    `),
    notice:
      "dyn Label has no fixed size, so it cannot sit in the vector by itself. The box has a known size. The concrete type is chosen when Box::new runs.",
    checks: [
      {
        id: "dyn-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "2" },
          { id: "b", label: "pier" },
          { id: "c", label: "Label" },
        ],
        answer: "a",
        explanation: "The vector is built with two boxes, so len() is 2.",
      },
      {
        id: "dyn-box",
        prompt: "Why is each part stored in a Box?",
        options: [
          { id: "a", label: "dyn Label has no known size, and a Box does" },
          { id: "b", label: "A trait object can only hold numbers" },
          { id: "c", label: "Box makes the method public" },
        ],
        answer: "a",
        explanation: "The vector needs items of one known size. A box is a pointer, so every slot is the same size even though Pier and Cable are not.",
      },
    ],
  },
  {
    id: "threads",
    chapter: "Concurrency",
    title: "join waits for a thread",
    summary:
      "spawn starts a closure on another thread. The closure returns 12. join waits until that thread finishes and hands the 12 back to main.",
    code: rust(`
      use std::thread;

      fn main() {
          let handle = thread::spawn(|| 12);
          let meters = handle.join().unwrap();
          println!("{meters}");
      }
    `),
    notice:
      "join returns a Result. unwrap takes the Ok value. The closure captures nothing, so it is safe to send to the new thread.",
    checks: [
      {
        id: "threads-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "12" },
          { id: "b", label: "Nothing. spawn returns before the closure runs." },
          { id: "c", label: "Ok(12)" },
        ],
        answer: "a",
        explanation: "join waits for the closure, unwrap takes 12, and println! writes that number.",
      },
      {
        id: "threads-join",
        prompt: "How does main receive the 12?",
        options: [
          { id: "a", label: "From join, which waits for the thread and returns its value" },
          { id: "b", label: "spawn itself returns 12" },
          { id: "c", label: "The closure writes a global that main reads" },
        ],
        answer: "a",
        explanation: "spawn returns a handle, not the closure's value. join is the wait, and its Result carries the 12.",
      },
    ],
  },
  {
    id: "channels",
    chapter: "Concurrency",
    title: "A channel moves a value across threads",
    summary:
      "mpsc::channel builds a sender and a receiver. The new thread owns the sender and sends 12. main receives that message and prints it. send moves the value. It does not share it.",
    code: rust(`
      use std::sync::mpsc;
      use std::thread;

      fn main() {
          let (tx, rx) = mpsc::channel();
          thread::spawn(move || {
              tx.send(12).unwrap();
          });
          let meters = rx.recv().unwrap();
          println!("{meters}");
      }
    `),
    notice:
      "mpsc means many senders, one receiver. recv waits until a message arrives. The move on the closure is required because tx is used on the other thread and must not stay in main.",
    checks: [
      {
        id: "channels-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "12" },
          { id: "b", label: "tx" },
          { id: "c", label: "Nothing. send keeps the value on the other thread." },
        ],
        answer: "a",
        explanation: "send moves 12 into the channel. recv takes it back out on main's thread, and the print writes 12.",
      },
      {
        id: "channels-move",
        prompt: "Why does the closure say move?",
        options: [
          { id: "a", label: "tx is moved into the thread, so only that thread can send" },
          { id: "b", label: "move makes recv return immediately" },
          { id: "c", label: "move copies 12 onto every thread" },
        ],
        answer: "a",
        explanation: "The sender has one owner. move gives that owner to the closure. main keeps the receiver.",
      },
    ],
  },
  {
    id: "shared-state",
    chapter: "Concurrency",
    title: "Arc and Mutex share one count",
    summary:
      "Three threads each add one to the same counter. Arc lets them share ownership of the counter. Mutex lets only one of them change it at a time. After every join, the count is 3.",
    code: rust(`
      use std::sync::{Arc, Mutex};
      use std::thread;

      fn main() {
          let bolts = Arc::new(Mutex::new(0));
          let mut handles = Vec::new();
          for _ in 0..3 {
              let bolts = Arc::clone(&bolts);
              handles.push(thread::spawn(move || {
                  let mut count = bolts.lock().unwrap();
                  *count += 1;
              }));
          }
          for handle in handles {
              handle.join().unwrap();
          }
          println!("{}", *bolts.lock().unwrap());
      }
    `),
    notice:
      "Arc::clone adds an owner. It does not copy the integer. lock waits for the mutex. The inner bolts binding shadows the outer one and is the owner that moves into that thread.",
    checks: [
      {
        id: "shared-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "0" },
          { id: "b", label: "1" },
          { id: "c", label: "3" },
        ],
        answer: "c",
        explanation: "Each of the three threads adds one, and main prints only after all three have joined.",
      },
      {
        id: "shared-both",
        prompt: "Why does the counter need both Arc and Mutex?",
        options: [
          { id: "a", label: "Arc shares ownership across threads. Mutex makes the change exclusive." },
          { id: "b", label: "Arc runs the threads. Mutex prints the number." },
          { id: "c", label: "Either one is enough to let several threads change an i32" },
        ],
        answer: "a",
        explanation: "An Arc<i32> can be shared and read, but not changed in place. A Mutex alone has one owner, so it cannot be moved into every thread. Together, the threads share the owner and take turns writing.",
      },
    ],
  },
  {
    id: "async-futures",
    chapter: "Concurrency",
    title: "An async function builds a future",
    summary:
      "Calling meters does not run its body and does not produce 12. It returns a future, which is a value that describes the work. This program builds that value, prints a line, and drops the future. Nothing polls it, so the body never runs.",
    code: rust(`
      async fn meters() -> u32 {
          12
      }

      fn main() {
          let future = meters();
          println!("future built");
          drop(future);
      }
    `),
    notice:
      "await is how async code waits on a future, and it is allowed only inside an async function. main is ordinary, and this program has no executor. An executor is the loop that polls a future until it finishes.",
    aside:
      "Try it compiles this program. It still does not run the body of meters. Running a future takes an executor, which is a separate crate, and this lesson stays in the standard library.",
    checks: [
      {
        id: "async-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "future built" },
          { id: "b", label: "12" },
          { id: "c", label: "future built and then 12" },
        ],
        answer: "a",
        explanation: "main prints one line. meters() only builds a future, and drop throws that future away before any executor polls it.",
      },
      {
        id: "async-call",
        prompt: "What does the call meters() produce in main?",
        options: [
          { id: "a", label: "A future. The 12 appears only after an executor polls it." },
          { id: "b", label: "The number 12, because the function body is the return value" },
          { id: "c", label: "A new thread that prints 12" },
        ],
        answer: "a",
        explanation: "async fn wraps the body in a future. The body runs when something polls that future, not when the function is called. A future is not a thread.",
      },
    ],
  },
];
