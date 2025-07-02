import {BlockMath, InlineMath} from "react-katex";
import JaccardExample from '../../../../assets/jaccard_example.png'
import JaccardIntersection from '../../../../assets/jaccard_intersection.png'
import JaccardUnion from '../../../../assets/jaccard_union.png'

const JaccardSimiliarity = () => {
    return (
        <div>
            <p className="tw-header top-1 sticky bg-white bg-opacity-80">Jaccard Similiarity</p>
            <p className="tw-subtitle">Let's throw a hypothetical problem you're having at work so we understand this
                concept as simply as possible. Let's say you're given a new task. This task is for you to compose the
                most efficient team given the project at hand. You are a project manager working in a 200+ employee
                company.
                The project requires a team of 10. The user data already contains which skills the employees
                posses, meaning the skill overlap to the project requirement isn't much of an issue. But what could be
                hard is finding a team that has a good dynamic.
            </p>
            <hr className="mt-2 mb-2"/>
            <p className="tw-subtitle">
                What you could do, is find the projects which the employees have previously worked in. And from there
                you can backtrace who has worked with who, and how frequently. This also seems like a great task for a
                graph database, both performance wise, and visually. We now want to find the node (nodes being the
                employees in this example) similiarities. And we can do this using <strong className="font-bold">Jaccard
                Similiarity</strong>.
            </p>
            <br/>
            The function looks as follows:
            <BlockMath math="J(A,B) = \frac{|A \cap B|}{|A \cup B|} = \frac{|A \cap B|}{|A| + |B| - |A \cap B|}"/>
            If you aren't too well versed with mathematical syntax in general, then this might initially seem a bit
            confusing, but it's actually very simple. Our numerator is the numer of common elements in the two sets, A
            and B. While the denominator is the sum of the unique elements of both sets, the union of the both sets can
            it also be called.

            <br/>
            <br/>
            <p className="tw-sub-header">Employees Example</p>
            So let us continue our example of finding employees with a good match:
            <img src={JaccardExample} alt="Jaccard Example" className="mt-2 ml-auto mr-auto"/>
            We have three employees, A, B and C. Employee A has worked on project 1 with specific employees where
            employee B has only worked on project 2, and Employee C has worked on both project 2 and project 3. We are
            now going to which of these three employees have the best relationship scoring. Following Jaccards algorithm
            we will find the intersection between our employees, being 3 pairs in this case. The formula to figure out
            how many combinations we will have to compare is:
            <BlockMath math="C(n,2) = n × (n-1) / 2"/>
            So if we had 10 employees it would be:
            <BlockMath math="C(10,2) = 10 × (10-1) / 2 = 45"/>
            <p className="tw-sub-header">Find Set Intersections</p>

            We now need to find the intersection between these 3 pairs:
            <img src={JaccardIntersection} alt="Jaccard Intersection" className="mt-2 ml-auto mr-auto"/>
            As said, we have three pairs, so we will denote the intersection for each of these pairs:
            <br/>
            <div className="flex justify-center"><InlineMath math="A \cap B = 1"/>; As they only share employee "Bob"
            </div>
            <br/>
            <div className="flex justify-center"><InlineMath math="A \cap C = 3"/>; As they share employees "Bob",
                "Sarah", and "Lisa"
            </div>
            <br/>
            <div className="flex justify-center"><InlineMath math="B \cap C = 3"/>; As they share employees "Bob",
                "Teddy", and "Monica"
            </div>

            <p className="tw-sub-header">Find Set Unions</p>
            Now we need to find the union of these 3 pairs. The unions is simply all the unique employees which both
            sets contain.
            <img src={JaccardUnion} alt="Jaccard Union" className="mt-2 ml-auto mr-auto"/>
            <br/>
            <div className="flex justify-center"><InlineMath math="A \cup B = 6"/></div>
            <br/>
            <div className="flex justify-center"><InlineMath math="A \cup C = 7"/></div>
            <br/>
            <div className="flex justify-center"><InlineMath math="B \cup C = 7"/></div>

            Now that we have the intersections and unions of each pair, we can at last calculate the Jaccard similarity for the three pairs and compare.
            <BlockMath math="J(A,B) = \frac{|A \cap B|}{|A \cup B|} = \frac{|A \cap B|}{|A| + |B| - |A \cap B|} = \frac{|Bob|}{|Bob, Mike, Sarah, Lisa, Teddy, Monica|} = \frac{|Bob|}{|Bob, Mike, Sarah, Lisa| + |Bob, Teddy, Monica| - |Bob|} = \frac{1}{7-1} = 0.166667"/>
            <BlockMath math="J(A,C) = \frac{|A \cap C|}{|A \cup C|} = \frac{|A \cap C|}{|A| + |C| - |A \cap C|} = \frac{|A \cap C|}{|A \cup C|} = \frac{|A \cap C|}{|A| + |C| - |A \cap C|}"/>
            <BlockMath math="J(B,C) = \frac{|B \cap C|}{|B \cup C|} = \frac{|B \cap C|}{|B| + |C| - |B \cap C|} = \frac{|B \cap C|}{|B \cup C|} = \frac{|B \cap C|}{|B| + |C| - |B \cap C|}"/>

        </div>
    )
}

export default JaccardSimiliarity;