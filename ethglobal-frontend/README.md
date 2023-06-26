# Project Description

## WHAT IT IS - OVERVIEW

Our project is a will administration solution based on Web3 and integrating multiple Web3 components (ie. smart contracts, blockchain) and tools (ie. XMTP notifications). What it does is one sentence is: we allow anyone who owns a crypto wallet to create & modify a will, and then directly distribute the assets in that wallet after they die to designated beneficiaries, according to their will.

Please see our last screenshot attachment for the entire process flow clearly laid out.

## HOW IT WORKS - ARCHITECTURAL LOGIC:

First, a user who owns a crypto wallet can create a will and authenticate it to create a smart contract through our web interface. They can also authenticate themselves by connecting their wallet to modify this will anytime before they die. There is a 1-to-1 pairing between wallets and wills.

Then, the smart contract and the user’s SIN number is stored in our back-end database along with other users who created a will through us. For each user in our database, we make a monthly API call using their SIN number as the key to the Government of Canada’s database of death records to determine monitor whether they die.

When a user is deceased based on government records, we activate an additional validation procedure by sending the user (who created the will) a message via XMTP like the following to ensure the government record is correct (ie. it has not been updated by mistake or hacked): "You have been registered as “deceased” in the Government of Canada's database. The assets in your smart contract wallet will be allocated according to your will if there is no action from you within 30 days. Please respond "No" to this message if you are alive, in which case the asset transfer will be blocked and a security alert will be issued to the Government of Canada for inaccurate records."

The user will then have 30 days to reply with “No” using XMTP if there indeed was a mistake and they are alive. This adds an important level of security to our solution. If there is no response from the user after 30 days of sending the above notification, then the smart contract is trigger.

When triggered, the smart contract executes the user’s will by calculating the total asset value in their wallet after death, dividing it based on the percentages the user specified in their will, and transferring them to each beneficiary’s wallet via blockchain.

## WHY WE BUILT IT - IMPACT:

The motivation behind this solution is because of a gap in the Web3 space today we identified after speaking to several partners and mentors. First, there is currently no easy way to create a scheme to transfer ownership of assets for people who are not pro Web3 developers. The infrastructure is available, but it’s not usable. Our solution makes it usable by integrating various technologies and creating a front end that any can navigate.

Second, wills for digital assets will be in high demand. Everyone will die, and more and more people are buying and owning digital assets in one way or another. However, the traditional way of paying a lawyer and locking your private key in a box so someone can retrieve it after you die is very costly and complex. This means a tremendous amount of digital wealth could be lost because of the highly secure nature of blockchain, which is a double edged sword when it comes to transferring wealth to your loved ones. Our solution foresees and addresses this issue to prevent the inadvertent wealth loss for not only individuals, but the entire Web3 space and society as a whole.

# How It's Made

The increasing prevalence of digital assets necessitates a high demand for wills specifically tailored to such assets. With a growing number of individuals acquiring and owning digital assets in various forms, the conventional approach of engaging a lawyer and securing private keys in physical containers for posthumous retrieval proves to be excessively expensive and complex. Consequently, the highly secure nature of blockchain technology, while advantageous in many respects, presents a double-edged sword when it comes to transferring wealth to loved ones. This predicament has the potential to result in significant loss of digital wealth. Our proposed solution anticipates and addresses this issue, aiming to prevent inadvertent wealth loss not only for individuals but also for the entire Web3 space and society as a whole.

Our solution offers several key benefits:

Transparency and Immutability: By leveraging blockchain technology, our system ensures that wills cannot be forged or tampered with, providing a secure and immutable record.

Accessibility, Cost-efficiency, and Storage Efficiency: Our platform offers high accessibility, cost-effectiveness, and efficient storage solutions, mitigating the complexities and expenses associated with traditional methods.

Dispute Resolution: Smart contracts embedded within the platform incorporate mechanisms for handling potential conflicts or disagreements among beneficiaries, such as arbitration clauses, thereby facilitating effective dispute resolution.

Legacy and Continuity: Storing wills on a blockchain guarantees their long-term availability and preservation, overcoming the risks of loss or destruction often associated with paper-based documents.

To automate this process, our solution collaborates with government organizations' databases to verify the official passing of the will creator. We utilize the Unlock protocol for streamlined wallet-based access to our platform. The frontend development employed TypeScript, Next.js, Daisy UI, React, and Tailwind CSS. Upon accessing the platform, users are prompted to create or modify their wills. If they choose to create a new will, we generate a corresponding record in our MongoDB + Prisma database. This record includes the user's wallet addresses and the weightage of each wallet they are inheriting. The information is securely stored in the database.

To ensure the accuracy of the will creator's status, we perform 12 API calls annually to the government database. If any changes are detected in the user's status within the government database, the will creator receives an XMTP notification, requesting confirmation of the death record within 14 days. If the user fails to verify the notification, the account is triggered, and the assets are distributed to the designated beneficiaries' wallets.

We have implemented the ERC20 standard to facilitate direct transfers between wallet addresses. The transfer process involves the contract address granting an allowance to the individual designated in the will. Based on the instructions in the will, specific amounts of tokens are then transferred to each recipient's account accordingly. However, it's important to note that the ERC20 standard does not support NFT transfers. Thus, our implementation serves as a prototype for demonstrating how token distribution from a "deceased" account could function.

During the initial stages of the hackathon, we dedicated considerable time to exploring alternative methods, such as utilizing the Gnosis Safe app's Zodiac exit module. This module allows for the fractional inheritance of a wallet to other users after a certain period. Unfortunately, we encountered a critical flaw in the app, as its exit settings were malfunctioning and outstanding issues reported since 2022 remained unresolved. Furthermore, the documentation was outdated, and the support for the platform was inadequate, leading us to abandon that approach and pursue other avenues.

We realized that each transaction involving popular wallets necessitated user acceptance. While we explored numerous ways to circumvent this requirement, it became apparent that bypassing the user's approval would pose significant security risks. As part of our future work, we aim to streamline the process by incorporating the following methods:

After a person has passed away, we flag their account as "dead." During the initial account setup on our platform, users are prompted to add trusted contacts. Following the "dead" flag, we securely notify these trusted contacts about the demise of their friend, urging them to log into our platform as trusted individuals. However, these trusted contacts cannot access the assets, will, or account without accepting the distribution of assets. This membership-based access mechanism is similar to the one used for the Unlock protocol. In this case, our wallets need to support multisignature functionality, or we securely transfer the wallet's private key to the trusted contact. Only after the assets have been distributed can the trusted contact access the will, account, and funds.

While we did not leverage NFTs in our current implementation, we intend to explore the concept of granting users an NFT when they create a will account. This NFT could then be airdropped to trusted contacts after the user's passing, serving as a means of accessing the will and account within our platform. However, the NFT would only allow viewing of the will and wouldn't permit modifications. Its primary purpose would be to trigger the distribution of assets.

In conclusion, we are pleased with our first blockchain project and the participation of many team members in their first-ever hackathon.
