import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bot, GraduationCap } from "lucide-react";
import { SmartPromptRefiner } from "@/components/smart-prompt-refiner";
import { PromptSimulator } from "@/components/prompt-simulator";
import { CodeBlock } from "@/components/ui/code-block";

const codePipInstall = `pip install guardrails-ai
guardrails configure`;

const codeBasicUsage = `from guardrails import Guard
from guardrails.hub import Toxicity

# Set a threshold for toxicity
toxicity_validator = Toxicity(threshold=0.5)

# Initialize the Guard with the validator
guard = Guard(validators=[toxicity_validator])

# Validate a toxic string
result = guard.validate("I hate you")

if result.valid:
    print("Valid")
else:
    print("Toxic content detected")`;
    
const codeCustomValidator = `@register_validator(name="no_profanity", data_type="string")
def no_profanity(value: str, metadata: dict):
    if "badword" in value:
        return FailResult("Profanity detected")
    return PassResult()`;

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-b from-background to-indigo-950/20">
      <div className="w-full max-w-5xl mx-auto">
        <header className="text-center py-12 space-y-4">
          <div className="inline-flex items-center justify-center gap-3 text-primary">
            <Bot className="w-12 h-12" />
            <GraduationCap className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            PromptCraft Academy
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            An interactive guide to the art and science of prompt engineering.
            Presented by <span className="font-semibold text-primary">IJAS A H</span>.
          </p>
        </header>

        <main className="space-y-12">
          <SmartPromptRefiner />
          
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold tracking-tight">Introduction to Prompt Engineering</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-lg text-muted-foreground">
                <p><span className="font-semibold text-primary">Prompts</span> are sets of instructions and context provided to a language model to perform a specific task. They act as a guideline, enabling the model to generate coherent and task-specific outputs.</p>
                <p><span className="font-semibold text-primary">Prompt engineering</span> is the process of creating, testing, and refining prompts to achieve desired outcomes. This technique helps maximize the efficiency and accuracy of language models in solving diverse problems.</p>
                
                <Accordion type="single" collapsible defaultValue="item-1">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-xl font-semibold text-foreground">Applications</AccordionTrigger>
                        <AccordionContent className="text-base space-y-2 pt-2">
                           <p>• <span className="font-medium">Text generation:</span> Writing articles or creative content.</p>
                           <p>• <span className="font-medium">Question answering:</span> Extracting specific information.</p>
                           <p>• <span className="font-medium">Code generation:</span> Assisting developers in writing code.</p>
                           <p>• <span className="font-medium">Conversational AI:</span> Developing interactive assistants.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <PromptSimulator 
                  title="Basic Prompt Example"
                  elements={[
                    { label: "Task", value: "Summarize the following text in one sentence." },
                    { label: "Text", value: "Photosynthesis allows plants to convert sunlight into energy." },
                  ]}
                  output="Photosynthesis converts sunlight into energy for plants."
                />

                <h3 className="text-2xl font-semibold tracking-tight text-foreground pt-4">Why Learn Prompt Engineering?</h3>
                <p>Prompt engineering is essential for advancing research in AI, understanding model behavior, developing innovative solutions, and improving efficiency in using language models.</p>

                <PromptSimulator 
                  title="Creative Prompt Example"
                  elements={[
                    { label: "Task", value: "Generate a haiku about nature." },
                  ]}
                  output={`Trees sway in the breeze,\nWhispering secrets they hold,\nNature's calm embrace.`}
                />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">Core Concepts and Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Accordion type="multiple" className="w-full space-y-4">
                    <AccordionItem value="decoding">
                        <AccordionTrigger className="text-xl font-semibold">Parameters of Decoding</AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-2">
                            <p className="text-muted-foreground">Decoding parameters govern the randomness and determinism of the model’s responses.</p>
                            <h4 className="font-semibold text-foreground">Greedy and Beam Search</h4>
                            <p className="text-muted-foreground">• <span className="font-medium text-foreground/80">Greedy Search:</span> Selects the most probable next word but lacks diversity.</p>
                            <p className="text-muted-foreground">• <span className="font-medium text-foreground/80">Beam Search:</span> Explores multiple sequences simultaneously, producing more refined outputs.</p>
                            <PromptSimulator 
                                title="Greedy vs. Beam Search"
                                elements={[{ label: "Prompt", value: "Write about a dragon." }]}
                                output={`Greedy Search: The dragon was big and scary.\nBeam Search: The dragon spread its mighty wings, soaring into the crimson sky.`}
                                explanation="Beam Search provides a more descriptive and refined output by considering multiple word sequences."
                            />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="sampling">
                        <AccordionTrigger className="text-xl font-semibold">Sampling Methods: Temperature & Top-p</AccordionTrigger>
                        <AccordionContent className="space-y-6 pt-2">
                            <div>
                                <h4 className="font-semibold text-lg text-primary">Temperature</h4>
                                <p className="text-muted-foreground">Think of temperature as a "spiciness level" for creativity. Low temperature is predictable (plain rice), while high temperature is adventurous and creative (spicy food).</p>
                                <PromptSimulator 
                                    title="Temperature Comparison"
                                    elements={[]}
                                    output={`Temperature 0.2: The sky is blue.\nTemperature 0.9: The azure sky shimmered under the golden sun.`}
                                    explanation="Higher temperature allows for more creative and descriptive language."
                                />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-primary">Top-p (Nucleus Sampling)</h4>
                                <p className="text-muted-foreground">Top-p is like choosing from a "priority basket" of words. A small `p` value considers only the most likely words, while a large `p` value includes more diverse and less common words.</p>
                                <PromptSimulator 
                                    title="Top-p Example"
                                    elements={[]}
                                    output={`Small p (e.g., 0.1): Leads to safe, repetitive text.\nLarge p (e.g., 0.9): Adds diversity and creativity.`}
                                    explanation="Top-p dynamically adjusts the pool of potential words based on cumulative probability, offering a balance between randomness and coherence."
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="elements">
                        <AccordionTrigger className="text-xl font-semibold">Elements of a Prompt</AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-2">
                            <p className="text-muted-foreground">Effective prompts are composed of instructions, context, input data, and an output indicator.</p>
                             <PromptSimulator 
                                title="Prompt Elements Example"
                                elements={[
                                    { label: "Instruction", value: "Translate to French." },
                                    { label: "Input Data", value: "Hello, how are you?" },
                                    { label: "Output Indicator", value: "The French translation is:" },
                                ]}
                                output="Bonjour, comment ça va?"
                                />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
          </Card>

          <Card>
             <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">Designing Prompts for Specific Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Text Summarization</h3>
                    <PromptSimulator 
                        title="Summarization"
                        elements={[{ label: "Prompt", value: `Summarize the following text in one sentence: "Photosynthesis is a process by which plants convert sunlight into energy."` }]}
                        output="Photosynthesis enables plants to convert sunlight into energy."
                    />
                </div>
                 <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Question Answering</h3>
                    <PromptSimulator 
                        title="Question Answering"
                        elements={[
                            { label: "Context", value: "OKT3 is sourced from mice and used in transplants." },
                            { label: "Question", value: "What is OKT3 originally sourced from?" },
                        ]}
                        output="Mice."
                    />
                </div>
                 <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Role Playing</h3>
                    <PromptSimulator 
                        title="Role Playing"
                        elements={[
                            { label: "Role", value: "AI Research Assistant" },
                            { label: "Human", value: "What is AI?" },
                        ]}
                        output="Artificial Intelligence (AI) is a branch of computer science focused on creating intelligent systems."
                    />
                </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">Advanced Techniques</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="multiple" className="w-full space-y-4">
                    <AccordionItem value="few-shot">
                        <AccordionTrigger className="text-xl font-semibold">Few-shot and Zero-shot Prompting</AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-2">
                           <p className="text-muted-foreground"><span className="font-semibold text-foreground">Few-shot Prompting</span> provides a few examples to the model to guide its response, teaching it the desired input-output relationship.</p>
                            <PromptSimulator 
                                title="Few-shot Prompting"
                                elements={[
                                    { label: "Task", value: "Classify emotions." },
                                    { label: "Example 1", value: 'Text: "I love this!" -> Emotion: Positive.' },
                                    { label: "Example 2", value: 'Text: "This is bad." -> Emotion: Negative.' },
                                    { label: "Input", value: 'Text: "I am happy."' },
                                ]}
                                output="Positive."
                            />
                            <p className="text-muted-foreground pt-4"><span className="font-semibold text-foreground">Zero-shot Prompting</span> directly asks the model to perform a task without examples, relying on its pre-trained knowledge.</p>
                             <PromptSimulator 
                                title="Zero-shot Prompting"
                                elements={[
                                    { label: "Task", value: "Solve the math problem." },
                                    { label: "Input", value: "2 + 2." },
                                ]}
                                output="4"
                            />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="cot">
                        <AccordionTrigger className="text-xl font-semibold">Chain-of-Thought (CoT) Prompting</AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-2">
                           <p className="text-muted-foreground">CoT encourages the model to break down complex tasks into smaller, step-by-step reasoning, leading to more accurate results.</p>
                            <PromptSimulator 
                                title="Chain-of-Thought"
                                elements={[
                                    { label: "Question", value: "I bought 5 apples and ate 2. How many do I have left?" },
                                ]}
                                output="First, I start with 5 apples. Then, I eat 2 of them. So, 5 - 2 = 3. I have 3 apples left.\nAnswer: 3"
                                explanation="The model explains its reasoning process before giving the final answer."
                            />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="self-consistency">
                        <AccordionTrigger className="text-xl font-semibold">Self-Consistency</AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-2">
                           <p className="text-muted-foreground">This technique generates multiple reasoning paths for a problem and chooses the most consistent answer, improving reliability.</p>
                            <PromptSimulator 
                                title="Self-Consistency"
                                elements={[
                                    { label: "Question", value: "I was 6, my sister was half my age. Now I am 40. How old is she?" },
                                ]}
                                output="Path 1: When I was 6, she was 3. The age difference is 3 years. Now I am 40, so she is 40 - 3 = 37.\nPath 2: My sister is always 3 years younger than me. When I am 40, she must be 37.\nAnswer: 37"
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">Risks in Prompt Engineering</CardTitle>
            </CardHeader>
            <CardContent>
                 <Accordion type="multiple" className="w-full space-y-4">
                    <AccordionItem value="injection">
                        <AccordionTrigger className="text-xl font-semibold">Prompt Injection</AccordionTrigger>
                        <AccordionContent className="pt-2 text-muted-foreground">
                            This occurs when malicious instructions are added to a prompt, which can hijack the model to perform unintended tasks, such as revealing private data.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="leaking">
                        <AccordionTrigger className="text-xl font-semibold">Prompt Leaking</AccordionTrigger>
                        <AccordionContent className="pt-2 text-muted-foreground">
                           This happens when a model unintentionally reveals sensitive information about its own prompt or internal instructions.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="jailbreaking">
                        <AccordionTrigger className="text-xl font-semibold">Jailbreaking</AccordionTrigger>
                        <AccordionContent className="pt-2 text-muted-foreground">
                           A form of prompt injection aimed at bypassing a model’s safety features, tricking it into generating harmful or restricted content.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">AI Guardrails</CardTitle>
                <CardDescription>Ensuring AI systems operate safely, ethically, and in alignment with human values.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Why Guardrails Are Important</h3>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                      <li><span className="font-medium text-foreground/80">Safety:</span> Prevents AI from generating harmful or dangerous content.</li>
                      <li><span className="font-medium text-foreground/80">Ethical Use:</span> Ensures AI aligns with moral and ethical standards.</li>
                      <li><span className="font-medium text-foreground/80">Bias Mitigation:</span> Reduces the risk of perpetuating social, gender, or racial biases.</li>
                      <li><span className="font-medium text-foreground/80">Compliance:</span> Helps meet regulatory standards (e.g., privacy laws).</li>
                      <li><span className="font-medium text-foreground/80">User Trust:</span> Builds confidence among users and stakeholders.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Implementing Guardrails in Python</h3>
                  <CodeBlock code={codePipInstall} />
                  <CodeBlock code={codeBasicUsage} />
                </div>
                 <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Common Validator Types</h3>
                    <ul className="list-none space-y-2 text-muted-foreground">
                      <li><code className="font-mono text-sm bg-muted p-1 rounded-md">RegexMatch</code>: Check if output matches a regex.</li>
                      <li><code className="font-mono text-sm bg-muted p-1 rounded-md">ToxicLanguage</code>: Detects toxicity.</li>
                      <li><code className="font-mono text-sm bg-muted p-1 rounded-md">DetectPII</code>: Finds Personally Identifiable Information.</li>
                      <li><code className="font-mono text-sm bg-muted p-1 rounded-md">ValidChoices</code>: Ensures output is from a list of valid choices.</li>
                      <li><code className="font-mono text-sm bg-muted p-1 rounded-md">RestrictToTopic</code>: Keeps the conversation on topic.</li>
                    </ul>
                 </div>
                 <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Custom Validator Example</h3>
                  <CodeBlock code={codeCustomValidator} />
                 </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">Conclusion & Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>AI guardrails are indispensable for ensuring the safe, ethical, and reliable operation of AI systems. By leveraging tools like guardrails-ai and employing validators tailored to specific use cases, developers can create more secure and trustworthy AI applications.</p>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Resources</h3>
                   <ul className="list-disc pl-5 space-y-1">
                      <li><a href="#" className="text-primary hover:underline">Guardrails AI Documentation</a></li>
                      <li><a href="#" className="text-primary hover:underline">GitHub Repository</a></li>
                      <li><a href="#" className="text-primary hover:underline">Tutorial Video</a></li>
                   </ul>
                </div>
            </CardContent>
          </Card>
        </main>

        <footer className="text-center py-12 mt-8">
            <Separator className="mb-8" />
            <p className="text-muted-foreground">
                PromptCraft Academy by <a href="#" className="font-semibold text-primary hover:underline">IJAS A H</a>
            </p>
            <p className="text-sm text-muted-foreground/50 mt-2">
                A modern tutorial for a modern era of AI.
            </p>
        </footer>
      </div>
    </div>
  );
}
