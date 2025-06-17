
const MachineLearningIntro: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Machine Learning</h1>
            <p className="text-gray-600 text-justify">
                Machine Learning can be split up into 3 main well-known categories. Supervised - Unsupervised - and
                Reinforced Learning.
                Each of these main categories have their own respective sub categories. And these will be runningly
                added with some interactivity to underline the main
                characteristics of each algorithm or technique.
                <hr className="mt-2 mb-2"/>
                There are of course other parent categories, such as Semi-supervised Learning, Self-supervised Learning,
                Transfer Learning, Few-shot Learning, Meta-learning, Online Learning. However I believe these categories
                fall into the two umbrellas, being supervised and unsupervised techniques. But they will also be given
                their respective folders.
            </p>

        </div>
    );
};

export default MachineLearningIntro;