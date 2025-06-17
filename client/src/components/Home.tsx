import {Github, ExternalLink, Star, GitFork} from 'lucide-react';

const Home: React.FC = () => {
    return (
        <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Hello :)</h1>
                <p className="text-gray-600">
                    Welcome to something! Where when I learn about something, I might write about so called -
                    "something." Mostly a
                    side project so I can ensure I understand what I learn, and hopefully pass it forward in
                    a more simplistic and interactive manner.
                </p>
                <hr className="mb-2 mt-2"/>
                <p className="text-gray-600">
                    This repo is open source. So if you would like to share something of your own, go ahead and
                    do so. You can sign your name to the page, and you will also be shown in the contributors
                    page where your username and page link will be attached.
                </p>
                <a
                    href="https://github.com/TernFolbaek/tern-yuka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all group"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <Github className="w-6 h-6 text-gray-700"/>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">TernFolbaek/tern-yuka</h4>
                        <ExternalLink
                            className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors"/>
                    </div>
                    <p className="text-gray-600 text-sm">Open source learning platform - contribute your
                        knowledge!</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <Star className="w-4 h-4"/>
                                Star
                            </span>
                        <span className="flex items-center gap-1">
                                <GitFork className="w-4 h-4"/>
                                Fork
                            </span>
                    </div>
                </a>
        </div>
    );
};

export default Home;