---
layout: post
title: Google excellent paper for 2011
keywords: ["Google paper 2011"]
description: "Google 2011年发表的论文选摘"
categories: ["research", "reading"]
tags: ["paper"]
---

Google每年都会发表很多优秀的论文，囊括了"社会网络，人工智能"等众多领域。

[传送门](http://research.google.com/pubs/papers.html)

在2011年，Google发表了若干精彩的论文，包括社会网络，机器学习，信息检索，自然语言处理，多媒体等多个领域。

下面选取了若干论文:

1、"Cascades of two-pole–two-zero asymmetric resonators are good models of peripheral auditory function", Richard F. Lyon,Journal of the Acoustical Society of America, vol. 130 (2011), pp. 3893-3904.

Lyon’s long title summarizes a result that he has been working toward over many years of modeling sound processing in the inner ear. This nonlinear cochlear model is shown to be "good" with respect to psychophysical data on masking, physiological data on mechanical and neural response, and computational efficiency. These properties derive from the close connection between wave propagation and filter cascades. This filter-cascade model of the ear is used as an efficient sound processor for several machine hearing projects at Google.

2、"Milgram-routing in social networks", Silvio Lattanzi, Alessandro Panconesi, D. Sivakumar, Proceedings of the 20th International Conference on World Wide Web, WWW 2011, pp. 725-734.

Milgram’s "six-degrees-of-separation experiment" and the fascinating small world hypothesis that follows from it, have generated a lot of interesting research in recent years. In this landmark experiment, Milgram showed that people unknown to each other are often connected by surprisingly short chains of acquaintances. In the paper we prove theoretically and experimentally how a recent model of social networks, "Affiliation Networks", offers an explanation to this phenomena and inspires interesting technique for local routing within social networks.

3、"Domain adaptation in regression", Corinna Cortes, Mehryar Mohri, Proceedings of The 22nd International Conference on Algorithmic Learning Theory, ALT 2011.

Domain adaptation is one of the most important and challenging problems in machine learning. This paper presents a series of theoretical guarantees for domain adaptation in regression, gives an adaptation algorithm based on that theory that can be cast as a semi-definite programming problem, derives an efficient solution for that problem by using results from smooth optimization, shows that the solution can scale to relatively large data sets, and reports extensive empirical results demonstrating the benefits of this new adaptation algorithm.

4、"Online Learning in the Manifold of Low-Rank Matrices", Gal Chechik, Daphna Weinshall, Uri Shalit, Neural Information Processing Systems (NIPS 23), 2011, pp. 2128-2136.

Learning measures of similarity from examples of similar and dissimilar pairs is a problem that is hard to scale. LORETA uses retractions, an operator from matrix optimization, to learn low-rank similarity matrices efficiently. This allows to learn similarities between objects like images or texts when represented using many more features than possible before.

5、"Inducing Sentence Structure from Parallel Corpora for Reordering", John DeNero, Jakob Uszkoreit, Proceedings of the 2011 Conference on Empirical Methods in Natural Language Processing (EMNLP).

Automatically discovering the full range of linguistic rules that govern the correct use of language is an appealing goal, but extremely challenging. Our paper describes a targeted method for discovering only those aspects of linguistic syntax necessary to explain how two different languages differ in their word ordering. By focusing on word order, we demonstrate an effective and practical application of unsupervised grammar induction that improves a Japanese to English machine translation system.

6、"Unsupervised Part-of-Speech Tagging with Bilingual Graph-Based Projections", Dipanjan Das, Slav Petrov, Proceedings of the 49th Annual Meeting of the Association for Computational Linguistics (ACL ’11), 2011, Best Paper Award.

We would like to have natural language processing systems for all languages, but obtaining labeled data for all languages and tasks is unrealistic and expensive. We present an approach which leverages existing resources in one language (for example English) to induce part-of-speech taggers for languages without any labeled training data. We use graph-based label propagation for cross-lingual knowledge transfer and use the projected labels as features in a hidden Markov model trained with the Expectation Maximization algorithm.

7、"Hyper-local, directions-based ranking of places", Petros Venetis, Hector Gonzalez, Alon Y. Halevy, Christian S. Jensen,PVLDB, vol. 4(5) (2011), pp. 290-30.

Click through information is one of the strongest signals we have for ranking web pages. We propose an equivalent signal for raking real world places: The number of times that people ask for precise directions to the address of the place. We show that this signal is competitive in quality with human reviews while being much cheaper to collect, we also show that the signal can be incorporated efficiently into a location search system.