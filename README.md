# Frontend-Assignment

Splunk front end interview assignment

Requirements
 Develop a frontend-only application to determine possible Server
Model Options based on hardware configurations that the user
selected.
 The UI must allow input of hardware configurations and output the
Server Models that matched the configuration inputted based on
the rules.
In the demo shows below, above the line is the input section. After
user put in all inputs and click “Submit”. Then the output section
which below the line would show up.

 Use Create React App https://create-react-app.dev/docs/getting-
started/ to build this in TypeScript.
Configuration evaluation
 Configurable attributes
o CPU: CPU models (Options: X86, Power, ARM). This
attribute is a dropdown list.
o Memory Size: Memory must be a multiple of 1024 in MB,
also must be a power of 2 (Example: 2,048MB, 4,096MB is
acceptable. But 3,072MB is not acceptable). And not less
than 2,048MB, this attribute is a Textarea that can be input
by user. The range of this attribute is 4,096MB (included)-
8,388,608MB (included). Comma separated integer number
is the only format this attribute can take.
o GPU Accelerator Card: Whether the server need GPU
Accelerator Card. This attribute is a checkbox.

2
 Server Models

1. Tower Server
2. 4U Rack Server
3. Mainframe
4. High Density Server
    There are Rules that used to determine which of those Server
   Models can be shown as options for users:
5. When select GPU Accelerator Card, only High Density
   Server would be available. And the memory must be greater
   or equal to 524,288MB. And CPU must be ARM.
6. Mainframe can only build with Power CPU, memory size
   limitation is applied on Rule 4. And Power CPU can build
   other Server Models except High Density.
7. Memory size greater or equal to 131,072MB can be both 4U
   Rack Server and Tower Server. Lower than that can only be
   Tower Server.
8. Any Model must not have a lower than 2,048MB memory.
   Lower than that would be “No Options”.
9. If there is no Server Model match the input, need to show
   “No Options”

Examples:

1. Configuration:
   a. CPU: Power,
   b. Memory Size: 1,024MB,
   c. No GPU Accelerator Card
   Outcome:
   No Options
   Reason:
   Match Rule 4: Memory is lower than 2,048MB
2. Configuration:
   a. CPU: Power,
   b. Memory Size: 262,144MB,
   c. No GPU Accelerator Card
   Outcome:
   Tower Server or 4U Rack Server or Mainframe
   Reason:
   Match Rule 2 and 3
3. Configuration:
   a. CPU: X86,
   b. Memory Size: 524,288MB,
   c. No GPU Accelerator Card
   Outcome:
   Tower Server or 4U Rack Server

3
Reason:
Match Rule 3 4. Configuration:
a. CPU: ARM,
b. Memory Size: 524,288MB,
c. With GPU Accelerator Card
Outcome:
High Density Server
Reason:
Match Rule 1
Above examples are just a part of the test cases.
Notes:

1. You may need to use third-part npm packages and CSS
   frameworks like MaterialUI, feel free to use them. You can change
   the style of the page to whatever you like. Doesn’t need to match
   the example layout.
2. Unit test is one of the items that we evaluate. Please pay attention
   to that.
   Submission:
   Please upload your code to your GitHub account and make the repo
   public accessible. Then please share the link with us.
