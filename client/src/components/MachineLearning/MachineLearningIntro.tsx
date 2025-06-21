import memeImage from '../../assets/machine_learning_intro_meme.jpg'

const MachineLearningIntro = () => {
    return (
        <div className="flex gap-20">
            <div className="flex-1">
                <h1 className="tw-header font-bold text-gray-900 mb-4">Machine Learning</h1>
                <p className="text-gray-600 tw-subtitle text-justify">
                    Machine Learning can be split up into 3 main well-known
                    categories. <strong>Supervised</strong> - <strong>Unsupervised</strong> - and
                    <strong> Reinforced</strong> Learning.
                    Each of these main categories have their own respective sub categories. And these will be runningly
                    added with some interactivity to underline the main
                    characteristics of each algorithm or technique.
                    <hr className="mt-2 mb-2"/>
                    There are of course other parent categories, such as Semi-supervised Learning, Self-supervised
                    Learning,
                    Transfer Learning, <strong>Few Shot Learning</strong> <strong>Meta Learning</strong>, <strong>Online Learning</strong>. However I believe these
                    categories
                    fall into the two umbrellas, being supervised and unsupervised techniques. But they will also be
                    given
                    their respective folders.
                </p>
            </div>
            <img className="flex-1 rounded-md" src={memeImage} alt="Meme Learning"/>
        </div>
    );
};

export default MachineLearningIntro;